import React from 'react';
import {connect} from 'react-redux';
import {paramChange} from '../actions/actions';

export default connect(
  state => ({volume: state.parameter.volume}),
  {setVolume: v => paramChange('volume', v)}
)(props => {
  return <input type="range" name="volume" min={0} max={1} step="any" onChange={e => props.setVolume(e.target.value)}/>
});