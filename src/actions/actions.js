
import {PARAM_CHANGE, NOTE_ON, NOTE_OFF} from './actionTypes';

// Takes a parameter name as string and the value to set it to.
export const paramChange = (param, value) => ({
  type: PARAM_CHANGE,
  param,
  value
});

// Takes a MIDI note value 1-127 and a velocity [0,1]
export const noteOn = (note, velocity = 0.5) => ({
  type: NOTE_ON,
  note,
  velocity
});

export const noteOff = (note) => ({
  type: NOTE_OFF,
  note
});
