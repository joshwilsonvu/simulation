/*
 * This file defines a custom audio processor. See https://webaudio.github.io/web-audio-api/#audioworklet.
 *
 * Globals: (from webaudio.github.io/web-audio-api/#audioworkletglobalscope)
 * void registerProcessor(name, processorCtor) - call this with your class, frame.e. registerProcessor(Foo.name, Foo)
 * unsigned long long currentFrame - the number of the current frame (a frame is one time point across channels)
 * double currentTime - the amount of time elapsed in seconds since audio has begun
 * float sampleRate - the sample rate in Hz
 */

/**
 * Wraps a generator so that it is suitable for use in an AudioWorklet.
 *
 * Because of the nature of generators, args will only be sent to the iterator
 * after the first yield statement, as in { let args; for(;;) { args = yield result; } }
 * Thus, you are encouraged to include one initial yield to get the first arguments.
 * If this goes unimplemented, the result will be essentially a single sample delay,
 * which is not a big deal for most processors.
 *
 * Example:
 * function* addNoise() {
 *   let {parameters, input, channelCount} = yield;
 *   for (;;) {
 *     let noise = (Math.random() * 2 - 1) * parameters.gain;
 *
 *     ({parameters, input, channelCount} = yield input + outputValue);
 *   }
 * }
 *
 * @param {Function} generator a generator to be wrapped in a subclass of AudioWorkletProcessor.
 *                   Should provide a property parameterDescriptors that defines the relevant AudioParams.
 *
 * @param {Array<any>} ctorArgs arguments to be passed to the generator function or bound to the class constructor
 *
 * @return {Class} a subclass of AudioWorkletProcessor that wraps the generator if given
 * @throws {RangeError} if processing is attempted on a finished generator, possible for processors but not sources
 */
export default function generatorAdapter(generator, ...ctorArgs) {
  return class extends AudioWorkletProcessor {
    constructor(options = {}) {
      super(options);
      this.iterator = generator(...ctorArgs);
      this.first = true;
      this.done = false;
      this.port.onmessage = e => {
        if (e.data.toString().toLowerCase() === 'stop') {
          this.done = true;
          this.iterator.return && this.iterator.return();
        }
      }
    }

    static get parameterDescriptors() {
      return generator.parameterDescriptors || [];
    }

    process(inputs, outputs, parameters) {
      if (this.done) {
        throw new RangeError('Attempted to process after iterator has finished.');
      }
      // Adapts for a single-input (optional), single-output processor, which should suit most cases.
      // Each input/output can have multiple channels.
      const input = inputs[0] || []; // empty array if no input
      const output = outputs[0];

      // Because this is such a hot loop (3ms at 44.1kHz), allocate objects only once to avoid frequent GC.
      const args = {parameters: {}, input: [], channelCount: output.length};

      // Most parameters don't need sample-accurate updates, so they are arrays with length 1.
      // Keep track of the ones that do.
      const changed = [];
      // Initialize the first frame parameters.
      for (let key in parameters) {
        if (parameters.hasOwnProperty(key)) {
          args.parameters[key] = parameters[key][0];
          if (parameters[key].length !== 1) {
            changed.push(key);
          }
        }
      }

      if (this.first) {
        // Update the input value, if any, with an array of samples in the single frame.
        for (let channel = 0; channel < input.length; channel++) {
          args.input[channel] = input[channel][0];
        }

        let {done} = this.iterator.next(args);
        if (done) {
          this.done = true;
          return false;
        }
        this.first = false;
      }

      // Main loop, always 128 samples
      for (let frame = 0; frame < output[0].length; ++frame) {
        // Update the parameters that have changed.
        for (let key of changed) {
          args.parameters[key] = parameters[key][frame];
        }
        // Update the input value, if any, with an array of samples in the single frame.
        for (let channel = 0; channel < input.length; channel++) {
          args.input[channel] = input[channel][frame];
        }

        // Get the next value of the generator function.
        const {value, done} = this.iterator.next(args);

        // Signal that the generator is done synthesizing/processing.
        if (done) {
          this.done = true;
          return false; // generator is done, don't continue
        }

        // Accept arrays as mono or multi-channel frames, and numbers as mono frames.
        for (let channel = 0; channel < output.length; ++channel) {
          output[channel][frame] = value.length ? value[channel] : value;
        }
      }
      return true; // keep alive
    }
  };
}
