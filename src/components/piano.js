import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Piano as ReactPiano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import Dimensions from 'react-dimensions';
import 'react-piano/dist/styles.css';
import {noteOn, noteOff} from '../actions/actions';

// class component for ref from Dimensions to work
class Piano extends Component {
  render() {
    const {first = MidiNumbers.fromNote('C4'), last = MidiNumbers.fromNote('F5'), noteOn, noteOff, containerWidth, containerHeight} = this.props;
    const keyboardShortcuts = KeyboardShortcuts.create({
      firstNote: first,
      lastNote: last,
      keyboardConfig: KeyboardShortcuts.HOME_ROW,
    });
    return <ReactPiano
      noteRange={{first, last}}
      keyboardShortcuts={keyboardShortcuts}
      playNote={noteOn}
      stopNote={noteOff}
      width={containerWidth}
      height={containerHeight}
    />;
  }
}

export default connect(
  undefined,
  {
    noteOn,
    noteOff,
  }
)(Dimensions()(Piano));