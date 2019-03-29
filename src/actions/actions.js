
import {PARAM_CHANGE, NOTE_ON, NOTE_OFF} from './actionTypes';

// Takes a parameter name as string and the value to set it to.
export const paramChange = (param, value) => ({
  type: PARAM_CHANGE,
  param,
  value
});

const noteOnPlain = (note, velocity) => ({
  type: NOTE_ON,
  note,
  velocity
});

const noteOffPlain = note => ({
  type: NOTE_OFF,
  note
});

// Takes a MIDI note value 1-127 and a velocity [0,1]. Dispatches NOTE_OFF if necessary.
export const noteOn = (note, velocity = 0.5) => (dispatch, getState) => {
  if (getState().note.indexOf(note) !== -1) {
    dispatch(noteOffPlain(note));
  }
  dispatch(noteOnPlain(note, velocity));
};

// Takes a MIDI note value 1-127. Only dispatches if necessary.
export const noteOff = (note) => (dispatch, getState) => {
  if (getState().note.indexOf(note) !== -1) {
    dispatch(noteOffPlain(note))
  }
};
