/**
 * Implements the Karplus-Strong Algorithm to generate a guitar string-like sound.
 */
class KarplusStrong extends AudioWorkletProcessor {

  static get propertyDescriptors() {
    return [
      {
        name: 'frequency',
        defaultValue: 440,
        minValue: 20,
        maxValue: 10000
      },
      {
        name: 'damping',
        defaultValue: 0.98,
        minValue: 0,
        maxValue: 1
      }
    ];
  }

  constructor() {
    super();

    // can't actually query this until this.getContextInfo() is implemented
    // update manually if you need it
    this.sampleRate = 44100;
    this.ringBuffer = null; // contains a Float32Array during processing
    this.i = 0;
  }

  process(inputs, outputs, parameters) {
    const speakers = outputs[0]; // output to the first device listed
    const mono = speakers[0]; // fill only the first channel, mono sound

    if (!this.buffer) {
      this.init();
    }

    // Each parameter is a Float32Array of either 1 or 128 audio samples
    // calculated by WebAudio engine from regular AudioParam operations.
    // (automation methods, setter) Without any AudioParam change, the array
    // would be a single value.
    let damping = parameters.damping[0];
    const isDampingConstant = parameters.damping.length === 1;
    for (let i = 0; i < mono.length; ++i) {
      if (!isDecayConstant) {
        damping = parameters.damping[i];
      }
      mono[i] = this.tick(damping); // advances one frame
    }

    return true; // keep alive
  }

  init(parameters) {
    // First render quantum, calculate buffer length and allocate
    // N approx = (fs/F0) - 1/2
    this.N = Math.round(this.sampleRate / parameters.frequency[0] - 0.5);
    this.buffer = new Float32Array(this.N);
    // Fill with random data for the strike
    for (let i = 0; i < this.N; ++i) {
      this.buffer[i] = Math.random() - 0.5;
    }
  }

  tick(damping) {
    // increment one step in the ring buffer and save values of i and i-1
    let im1 = this.i, N = this.N;
    let i = this.i = (im1 + 1) % N;

    let xim1 = this.ringBuffer[im1];
    let xi = this.ringBuffer[im1];

    return damping * 0.5 * (xi + xim1);
  }
}

function register(Class) {
  registerProcessor(Class.name, Class);
}

register(KarplusStrong);