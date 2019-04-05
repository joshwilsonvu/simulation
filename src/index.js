import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import {ThemeProvider} from 'styled-components';

import {App} from './components/app';
import GlobalStyle from './style/global-style';
import theme from './style/theme';

import 'audioworklet-polyfill'; // add support for AudioWorklet on Safari, etc.
import 'normalize.css'; // establish more consistent global styling

// Create a div for React to live inside
let div = document.createElement('div');
document.body.appendChild(div);

// Render the whole application
render(
  <HelmetProvider>
    <GlobalStyle/>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </HelmetProvider>,
  div
);

