export const postCreate = text => ({
  type: 'POST:CREATE',
  text: text
});

export const postsReceive = posts => ({
  type: 'POSTS:RECEIVE',
  posts: posts
});

