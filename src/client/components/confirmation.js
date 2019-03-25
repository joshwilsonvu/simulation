import styled from 'styled-components';
import React from 'react';

const PlainBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: inherit;
  padding: 0;
  cursor: pointer;
  font-size: 150%;
`;

export const CheckBtn = props => (
  <PlainBtn {...props}>
    &#10004;
  </PlainBtn>
);

export const XBtn = props => (
  <PlainBtn {...props}>
    &#10008;
  </PlainBtn>
);

export const Confirm = ({onConfirm, onDeny, confirmProps, denyProps}) => (
  <>
    <div>
      {confirmProps || onConfirm ? <CheckBtn {...confirmProps} onClick={onConfirm}/> : null}
    </div>
    <div>
      {denyProps || onDeny ? <XBtn {...denyProps} onClick={onDeny}/> : null}
    </div>
  </>
);
