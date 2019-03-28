
// A separate script file, to be included
class StringSimulator extends AudioWorkletProcessor {

  static get propertyDescriptors() {
    return [{
      name: 'foo',
      defaultValue: 0
    }]
  }

  process(inputs, outputs, parameters) {
    // |myParamValues| is a Float32Array of either 1 or 128 audio samples
    // calculated by WebAudio engine from regular AudioParam operations.
    // (automation methods, setter) Without any AudioParam change, this array
    // would be a single value of 0.707.
    const myParamValues = parameters.myParam;

    if (myParamValues.length === 1) {
      // |myParam| has been a constant value for the current render quantum,
      // which can be accessed by |myParamValues[0]|.
    } else {
      // |myParam| has been changed and |myParamValues| has 128 values.
    }
  }
}