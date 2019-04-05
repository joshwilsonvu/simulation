
import {PARAM_CHANGE} from './actionTypes';

// Takes a parameter name as string and the value to set it to.
export const paramChange = (param, value) => ({
  type: PARAM_CHANGE,
  param,
  value
});
