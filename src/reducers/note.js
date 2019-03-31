
import {NOTE_OFF, NOTE_ON} from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  let index;
  switch(action.type) {
    case NOTE_ON:
      // If we get a NOTE_ON before receiving a NOTE_OFF on the
      // same pitch for a previous note, do nothing, this is wrong.
      return index === -1 ? state.concat(action.note).sort() : state;
    case NOTE_OFF:
      // Likewise, do nothing for multiple NOTE_OFFs
      index = state.indexOf(action.note);
      return index !== -1 ? state.slice().splice(index,1) : state;
  }
  return state;
}