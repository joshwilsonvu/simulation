
import {NOTE_ON, NOTE_OFF} from '../actions/actionTypes';


class StringNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'string-simulator', {
      numberOfInputs: 0,
      numberOfOutputs: 1,
      outputChannelCount: [1]
    });
  }

  noteOn(note) {
    this.port.postMessage({type: NOTE_ON, note});
  }

  noteOff(note) {
    this.port.postMessage({type: NOTE_OFF, })
  }


}