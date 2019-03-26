import React, {Component} from 'react';

import styled from 'styled-components';

const AppPad = styled.div`
  margin: 0;
  padding: 0 ${props => props.theme.padding};
  min-height: 100vh;
  text-align: center;
  line-height: 1.5;
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.themeColor};
  font-family: monospace;
`;
const AppCenter = styled.div`
  display: inline-block;
  max-width: 40rem;
  width: 100%;
  text-align: left;
`;

export const App = props => (
  <AppPad>
    <AppCenter>
      Hello world!
    </AppCenter>
  </AppPad>
);
