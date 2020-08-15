const RedditAPI = require("reddit-wrapper-v2");
const dotenv = require("dotenv").config();

const redditWrapper = new RedditAPI({
  // Options for Reddit Wrapper
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
  app_id: process.env.REDDIT_ID,
  api_secret: process.env.REDDIT_SECRET,
  user_agent: "Joot-Zoo scraper script",
  retry_on_wait: true,
  retry_on_server_error: 5,
  retry_delay: 1,
  logs: true,
});

// TODO go thru posts and check if post has been removed
// TODO get posts from `pre-approved` subreddits to prevent NSFW/inappropriate content
function getTenPosts() {
  return redditWrapper.api
    .get(`/user/${process.env.REDDIT_USERNAME}/upvoted`, {
      limit: 10,
    })
    .then((res) => {
      return res[1].data;
    });
}

module.exports = {
  getTenPosts,
};
