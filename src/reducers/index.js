import {combineReducers} from 'redux';
import parameter from './parameter';
import note from './note';

// export a combination of all reducers
export default combineReducers({
  parameter,
  note
});