const RedditApp = function() {
  let posts = [];
  const $posts = $('.posts');

  const createPost = function (text, user) {
    posts.push({ text: text, name: user, comments: []});
  }

  const renderPosts = function() {
    $posts.empty();
  }

  return {
    createPost: createPost,
    renderPosts: renderPosts
  }
}

const reddit = RedditApp();