
import {NOTE_ON, NOTE_OFF} from '../actions/actionTypes';


class StringNode extends AudioWorkletNode {
  constructor(context) {
    super(context, 'string-simulator');
  }

  noteOn(note, velocity) {
    this.port.postMessage({type: NOTE_ON, note, velocity});
  }

  noteOff(note) {
    this.port.postMessage()
  }
}