import React from 'react';

const mod = (x, n) => (x % n + n) % n;

const Key = ({ note, width, begin }) => {
  // middle C is MIDI note 60
  const pitch = mod(note - 60, 12); // C = 0, B = 11
  const accidental = [1,3,6,8,10].indexOf(pitch) + 1;
  const pos =
};

export const Keyboard = props => {

};