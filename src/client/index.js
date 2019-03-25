'use strict';

import React from 'react';
import {render} from 'react-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import {App} from './components/app';
import {sessionReducer} from './reducers/session.js';
import {postReducer} from './reducers/post';
import {sessionBegin} from './actions/session';
import {postsReceive} from './actions/post';
import {websocketsMiddleware} from './middleware/websockets';

import theme from './theme';

const store = createStore(
  combineReducers({
    session: sessionReducer,
    post: postReducer
  }),
  applyMiddleware(websocketsMiddleware)
);

store.dispatch({type: 'SOCKET:INIT'});

if (window.__PRELOADED_STATE__) {
  let username, posts;
  if (username = window.__PRELOADED_STATE__.username) {
    store.dispatch(sessionBegin(window.__PRELOADED_STATE__.username));
  }
  if (posts = window.__PRELOADED_STATE__.posts) {
    store.dispatch(postsReceive(posts));
  }
}

// Function to render the whole application
render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);

