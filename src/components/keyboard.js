import React from 'react';

const mod = (x, n) => (x % n + n) % n;

const Key = ({ note, gliss, width, begin, ...rest }) => {
  // A4 is MIDI note 69
  const accidentalWidth = 0.65;
  const pitch = mod(note - 69, 12); // A = 0, G# = 11
  const natural = [0,2,3,5,7,8,10].indexOf(pitch);
  const accidental = [1,4,6,9,11].indexOf(pitch) + 1;
  const pos = ;

  return (
    <div style={{
      left: pos,
      width: accidental ? width : width * accidentalWidth
    }} {...rest}/>
  )
};

export const Keyboard = props => {

};