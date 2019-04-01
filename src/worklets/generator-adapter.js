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
 *
 * @param {Class|Function} classOrGenerator a subclass of AudioWorkletProcessor or a generator to be patched
 * @param {any} ctorArgs arguments to be passed to the generator function or bound to the class constructor
 *
 * @return {Class} a subclass of AudioWorkletProcessor that wraps the generator if given
 */
export default function generatorAdapter(classOrGenerator, ...ctorArgs) {
  return classOrGenerator instanceof AudioWorkletProcessor ? classOrGenerator.bind(undefined, ...ctorArgs) : (
    class Adapter extends AudioWorkletProcessor {
      constructor(options = {}) {
        super(options);
        this.iterator = classOrGenerator(...ctorArgs);
      }

      process(inputs, outputs, parameters) {
        // Adapts for a single-input (optional), single-output processor, which should suit most cases.
        // Each input/output can have multiple channels.
        const input = inputs[0];
        const output = outputs[0];

        // Because this is such a hot loop (3ms at 44.1kHz), allocate objects only once to avoid frequent GC.
        const args = {parameters: {}, input: input ? [] : undefined};

        // Most parameters don't need sample-accurate updates, so they are arrays with length 1.
        // Keep track of the ones that do.
        const keys = parameters.keys();
        const changed = keys.filter(key => parameters[key].length !== 1);

        // Initialize the first frame parameters
        for (let key of keys) {
          args.parameters[key] = parameters[key][0];
        }

        // Main loop
        for (let frame = 0; frame < output[0].length /* = 128 */; ++frame) {
          // Update the parameters that have changed
          for (let key of changed) {
            args.parameters[key] = parameters[key][frame];
          }
          // Update the input value, if any, with an array of samples in the single frame
          if (input) {
            for (let channel = 0; channel < input.length; channel++) {
              args.input[channel] = input[channel][frame];
            }
          }

          // Get the next value of the generator function.
          const {value, done} = this.iterator.next(args);

          // Accept arrays as mono or multi-channel frames, and numbers as mono frames
          if (Array.isArray(value)) {
            output[frame] = value;
          } else {
            for (let channel = 0; channel < output[frame].length; ++channel) {
              output[frame][channel] = value;
            }
          }

          if (done) {
            return false; // generator is done, don't continue
          }
        }
        return true; // keep alive
      }
    }
  );
}