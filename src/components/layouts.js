import React from 'react';
import styled from 'styled-components';

export const Root = styled.div`
  border-style: hidden;
  padding: ${props => props.theme.padding};
  background-color: ${props => props.theme.backgroundColor}
`;

