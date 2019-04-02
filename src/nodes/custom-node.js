
import KarplusStrong from '../worklets/karplus-strong.worklet';

console.log(KarplusStrong);

export default class CustomNode extends AudioWorkletNode {
  constructor(context, processorName, parameterData = {}) {
    super(context, processorName, {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      parameterData
    });
  }
}
