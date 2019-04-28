import { fromGenerator } from 'simple-audio-worklet';

function* karplusStrong({parameters, env}) {
  // Calculate buffer length and allocate N approx = (fs/F0) - 1/2
  const N = Math.round(env.sampleRate / parameters.frequency - 0.5);
  const ringBuffer = new Float32Array(N);

  // Fill with random data for the strike
  for (let i = 0; i < N; ++i) {
    ringBuffer[i] = 2 * Math.random() - 1;
  }
  // Filter the random data with cutoff of initialFilter
  const initFilter = makeFilter(parameters.initFilter, env.sampleRate);
  for (let i = 1; i < N; ++i) {
    ringBuffer[i] = initFilter(ringBuffer[i], ringBuffer[i-1]);
  }

  // Remove any DC offset if requested
  removeDC(ringBuffer, parameters.removeDC);

  const decayFilter = makeFilter(parameters.decayFilter, env.sampleRate);

  try {
    for (let i = 0; ;) {
      // increment one step in the ring buffer and save values of i and i-1
      let im1 = i;
      i = (im1 + 1) % N;

      let xim1 = ringBuffer[im1];
      let xi = ringBuffer[i];

      ringBuffer[i] = parameters.damping * decayFilter(xi, xim1);

      // Update arguments
      yield ringBuffer[i];
    }
  } finally {
    // cleanup code would go here
  }
}

const parameterDescriptors = [
  {
    name: 'frequency',
    defaultValue: 440,
    minValue: 1
  },
  {
    name: 'damping',
    defaultValue: 0.995,
    minValue: 0.9,
    maxValue: 1
  },
  {
    name: 'initFilter',
    defaultValue: sampleRate / 2,
    minValue: 1,
    maxValue: sampleRate / 2
  },
  {
    name: 'decayFilter',
    defaultValue: sampleRate / (2 * Math.PI),
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

function makeFilter(cutoff, sampleRate) {
  const z = 2 * Math.PI / sampleRate * cutoff;
  const alpha = z / (z + 1);
  return (xi, xim1) => xim1 + alpha * (xi - xim1);
}

function removeDC(array, amount) {
  if (amount) {
    let s = sum(array);
    const avg = s / array.length * amount;
    for (let i = 0; i < array.length; ++i) {
      array[i] -= avg;
    }
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

fromGenerator(karplusStrong, { registerAs: 'karplus-strong', parameterDescriptors });