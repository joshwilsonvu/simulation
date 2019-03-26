import io from 'socket.io-client';

const socket = io();

// Inbound Message from Socket server
const incomingMessages = [
  'SESSION:LOGIN',
  'SESSION:ERROR',
  'POSTS:RECEIVE',
  'POST:RECEIVE',
  'POST:ERROR'
];

export const websocketsMiddleware = store => next => action => {
  const {type, ...payload} = action;
  if (type === 'SOCKET:INIT') {
    // Setup the socket callbacks
    incomingMessages.forEach(type => {
      socket.on(type, payload => {
        store.dispatch(Object.assign({type: type}, payload));
      });
    });
  } else if (type === 'POST:CREATE' && payload.text !== '') {
    socket.emit('POST:CREATE', {text: payload.text});
  } else if (type === 'POSTS:REQUEST') {
    // length will be one higher than the highest index (id) or 0
    socket.emit('POSTS:REQUEST', {beginID: store.getState().post.posts.length});
  } else if (type === 'SESSION:BEGIN') {
    socket.emit('SESSION:BEGIN', {username: payload.username, password: payload.password});
  } else if (type === 'SESSION:END') {
    socket.emit('SESSION:END');
    next(action);
  } else {
    next(action); // let store handle other actions
  }
};