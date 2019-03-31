
import {PARAM_CHANGE, NOTE_ON, NOTE_OFF} from './actionTypes';

// Takes a parameter name as string and the value to set it to.
export const paramChange = (param, value) => ({
  type: PARAM_CHANGE,
  param,
  value
});

export const noteOn = (note) => ({
  type: NOTE_ON,
  note,
});

export const noteOff = note => ({
  type: NOTE_OFF,
  note,
});