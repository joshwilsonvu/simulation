import React, {useEffect, useState} from 'react';
import {Piano as ReactPiano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import styled from 'styled-components';
import {MdArrowBack, MdArrowForward} from 'react-icons/md';
import useEventListener from '@use-it/event-listener';
import 'react-piano/dist/styles.css';

const c0 = MidiNumbers.fromNote('C0'), g1 = MidiNumbers.fromNote('G1');
const minOffset = 1, maxOffset = 6;

const keyboardConfig = [
  {natural: 'q', flat: '1', sharp: '2'},
  {natural: 'w', flat: '2', sharp: '3'},
  {natural: 'e', flat: '3', sharp: '4'},
  {natural: 'r', flat: '4', sharp: '5'},
  {natural: 't', flat: '5', sharp: '6'},
  {natural: 'y', flat: '6', sharp: '7'},
  {natural: 'u', flat: '7', sharp: '8'},
  {natural: 'i', flat: '8', sharp: '9'},
  {natural: 'o', flat: '9', sharp: '0'},
  {natural: 'p', flat: '0', sharp: '-'},
  {natural: '[', flat: '-', sharp: '='},
  {natural: ']', flat: '=', sharp: 'Backspace'}
];

const PositionWrapper = styled.div`
  width: 100%;
  min-height: 25px;
  background-color: #f6f5f3;
  border-radius: 4px;
  position: relative;
  margin-bottom: 4px;
  &>div {
    position: absolute;
    box-sizing: border-box;
    height: 100%;
    z-index: 1;
  }
`;
const PositionArrowLeft = styled.div`
  bottom: 0;
  left: 0;
  padding: 4px;
`;
const PositionArrowRight = styled.div`
  bottom: 0;
  right: 0;
  padding-right: 4px;
  padding-top: 4px;
`;
const PositionIndicator = styled.div`
  width: ${100 / (maxOffset - minOffset + 1)}%;
  left: ${props => (100 / (maxOffset - minOffset + 1)) * (props.octaveOffset - minOffset)}%;
  background-color: #555;
  opacity: 50%;
`;

export default ({playNote, stopNote, width, ...rest}) => {
  const [octaveOffset, setOctaveOffset] = useState(3); // start at C3
  useEventListener('keydown', ({key}) => {
    if (key === 'ArrowLeft') {
      setOctaveOffset(Math.max(octaveOffset - 1, minOffset));
    } else if (key === 'ArrowRight') {
      setOctaveOffset(Math.min(octaveOffset + 1, maxOffset));
    }
  }, document.body);
  const first = c0 + octaveOffset * 12, last = g1 + octaveOffset * 12;
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: first,
    lastNote: last,
    keyboardConfig,
  });
  return <>
    <PositionWrapper width={width}>
      <PositionArrowLeft>
        <MdArrowBack/>
      </PositionArrowLeft>
      <PositionIndicator octaveOffset={octaveOffset}/>
      <PositionArrowRight>
        <MdArrowForward/>
      </PositionArrowRight>
    </PositionWrapper>
    <ReactPiano
      noteRange={{first, last}}
      keyboardShortcuts={keyboardShortcuts}
      playNote={playNote}
      stopNote={stopNote}
      width={width}
      {...rest}
    />
  </>;
};
