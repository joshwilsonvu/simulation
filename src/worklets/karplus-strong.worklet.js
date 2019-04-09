/*
 * This file defines a custom audio processor. See https://webaudio.github.io/web-audio-api/#audioworklet.
 *
 * Globals: (from webaudio.github.io/web-audio-api/#audioworkletglobalscope)
 * void registerProcessor(name, processorCtor) - call this with your class, i.e. registerProcessor(Foo.name, Foo)
 * unsigned long long currentFrame - the number of the current frame (a frame is one time point across channels)
 * double currentTime - the amount of time elapsed in seconds since audio has begun
 * float sampleRate - the sample rate in Hz
 */

import generatorAdapter from './generator-adapter';

function* karplusStrong({parameters}) {
  // Calculate buffer length and allocate N approx = (fs/F0) - 1/2
  const N = Math.round(sampleRate / parameters.frequency - 0.5);
  const ringBuffer = new Float32Array(N);

  // Fill with random data for the strike
  for (let i = 0; i < N; ++i) {
    ringBuffer[i] = 2 * Math.random() - 1;
  }
  // Filter the random data with cutoff of initialFilter
  filter(ringBuffer, parameters.cutoff);

  // Remove any DC offset if requested
  if (parameters.removeDC) {
    removeDC(ringBuffer);
  }

  try {
    for (let i = 0; ;) {
      // increment one step in the ring buffer and save values of i and i-1
      let im1 = i;
      i = (im1 + 1) % N;

      let xim1 = ringBuffer[im1];
      let xi = ringBuffer[i];

      ringBuffer[i] = parameters.damping * 0.5 * (xi + xim1);

      // Update arguments
      ({parameters} = yield ringBuffer[i]);
    }
  } finally {
    // cleanup code would go here
  }
}

karplusStrong.parameterDescriptors = [
  {
    name: 'frequency',
    defaultValue: 440,
    minValue: 1
  },
  {
    name: 'damping',
    defaultValue: 0.995,
    minValue: 0,
    maxValue: 1.005
  },
  {
    name: 'cutoff',
    defaultValue: sampleRate / 2,
    minValue: 1,
    maxValue: sampleRate / 2
  },
  {
    name: 'removeDC',
    defaultValue: 0,
    minValue: 0,
    maxValue: 1
  }
];

function filter(array, cutoff) {
  const dt = 1 / sampleRate;
  const alpha = (2 * Math.PI * dt * cutoff) / (2 * Math.PI * dt * cutoff + 1);
  for (let i = 1; i < array.length; ++i) {
    array[i] = array[i - 1] + alpha * (array[i] - array[i - 1]);
  }
}

function removeDC(array) {
  let s = sum(array);
  const avg = s / array.length;
  for (let i = 0; i < array.length; ++i) {
    array[i] -= avg;
  }
}

// Kahan summation algorithm for accuracy
function sum(array) {
  let s = 0, c = 0;
  for (const val of array) {
    let y = val - c;
    let t = s + y;
    c = (t - s) - y;
    s = t;
  }
  return s;
}

registerProcessor('karplus-strong', generatorAdapter(karplusStrong), false);