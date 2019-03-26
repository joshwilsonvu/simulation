'use strict';

import React from 'react';
import {render} from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {App} from './components/app';

import theme from './theme';
import './css/base.css';

let div = document.createElement("div");
document.body.appendChild(div);
console.log("appended div");
// Function to render the whole application
render(
  <ThemeProvider theme={theme}>
    <App/>
  </ThemeProvider>,
  div
);

