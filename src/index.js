import React from 'react';
import {render} from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';
import ReduxThunk from 'redux-thunk';

import {App} from './components/app';
import GlobalStyle from './style/global-style';
import theme from './style/theme';
import reducer from './reducers/index';

import 'audioworklet-polyfill'; // add support for AudioWorklet on Safari, etc.
import 'normalize.css'; // establish more consistent global styling

// Create the global store for the application
let store = createStore(reducer, applyMiddleware(ReduxThunk, logger));
// Create a div for React to live inside
let div = document.createElement('div');
document.body.appendChild(div);

// Render the whole application
render(
  <>
    <GlobalStyle/>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Provider>
  </>,
  div
);

