export const sessionBegin = (username, password) => ({
  type: 'SESSION:BEGIN',
  username: username,
  password: password
});

export const sessionEnd = () => ({
  type: 'SESSION:END'
});