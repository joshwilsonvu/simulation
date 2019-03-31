import {NOTE_ON, NOTE_OFF} from '../actions/actionTypes';


export default class CustomNode extends AudioWorkletNode {
  constructor(context, processorName, parameterData = {}) {
    super(context, processorName, {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1],
      parameterData
    });
  }

  noteOff(note) {
    this.parameters.on.value = false;
  }


}