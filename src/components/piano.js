import React, {useState} from 'react';
import {Piano as ReactPiano, KeyboardShortcuts, MidiNumbers} from 'react-piano';
import styled from 'styled-components';
import {MdArrowBack, MdArrowForward} from 'react-icons/md';
import useEventListener from '@use-it/event-listener';
import 'react-piano/dist/styles.css';

const c0 = MidiNumbers.fromNote('C0'), f1 = MidiNumbers.fromNote('F1');
const minOffset = 1, maxOffset = 6;

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
      window.dispatchEvent(new CustomEvent('move-octave', {detail: -1}));
    } else if (key === 'ArrowRight') {
      window.dispatchEvent(new CustomEvent('move-octave', {detail: 1}));
    }
  }, document.body);
  useEventListener('move-octave', ({detail}) => {
      setOctaveOffset(Math.min(Math.max(octaveOffset + detail, minOffset), maxOffset));
  }, window);
  const first = c0 + octaveOffset * 12, last = f1 + octaveOffset * 12;
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: first,
    lastNote: last,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  return <>
    <PositionWrapper width={width}>
      <PositionArrowLeft onClick={e => window.dispatchEvent(new CustomEvent('move-octave', {detail: -1}))}>
        <MdArrowBack/>
      </PositionArrowLeft>
      <PositionIndicator octaveOffset={octaveOffset}/>
      <PositionArrowRight onClick={e => window.dispatchEvent(new CustomEvent('move-octave', {detail: 1}))}>
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
