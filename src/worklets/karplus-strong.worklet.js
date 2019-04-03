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

function* karplusStrong() {
// get initial arguments
  let {parameters} = yield;

  const start = currentTime;

  // Calculate buffer length and allocate N approx = (fs/F0) - 1/2
  const N = Math.round(sampleRate / parameters.frequency - 0.5);
  const ringBuffer = new Float32Array(N);
  // Fill with random data for the strike
  for (let i = 0; i < N; ++i) {
    ringBuffer[i] = Math.random() - 0.5;
  }

  let i = 0;
  for (;;) {
    if (currentTime > start + parameters.duration) {
      return;
    }
    // increment one step in the ring buffer and save values of i and i-1
    let im1 = i;
    i = (im1 + 1) % N;

    let xim1 = ringBuffer[im1];
    let xi = ringBuffer[i];

    ringBuffer[i] = parameters.damping * 0.5 * (xi + xim1);

    // Update arguments
    ({parameters} = yield ringBuffer[i]);
  }
}

karplusStrong.parameterDescriptors = [
  {
    name: 'frequency',
    defaultValue: 440
  },
  {
    name: 'damping',
    defaultValue: 0.995
  },
  {
    name: 'duration',
    defaultValue: 3
  }
];

registerProcessor('KarplusStrong', generatorAdapter(karplusStrong));