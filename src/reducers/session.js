const initialState = {
  username: ''
};

export const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SESSION:LOGIN':
      return Object.assign({}, state, {username: action.username, error: false});
    case 'SESSION:END':
      return Object.assign({}, state, {username: '', error: false});
    case 'SESSION:ERROR':
      return Object.assign({}, state, {username: '', error: true});
    default:
      return state;
  }
};