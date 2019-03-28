
import {PARAM_CHANGE} from '../actions/actionTypes'

const initialState = {
  masterVolume: 1,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case PARAM_CHANGE:
      return {...state, [action.param]: action.value}; // update param in state
  }
  return state;
}