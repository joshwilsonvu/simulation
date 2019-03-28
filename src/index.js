import React from 'react';
import {render} from 'react-dom';
import {ThemeProvider} from 'styled-components';
import {MuiThemeProvider} from '@material-ui/core';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger';

import {App} from './components/app';
import theme from './theme';
import reducer from './reducers/index';

// Create the global store for the application
let store = createStore(reducer, applyMiddleware(logger));
// Create a div for React to live inside
let div = document.createElement('div');
document.body.appendChild(div);

// Render the whole application
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  div
);

