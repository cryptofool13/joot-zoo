const RedditAPI = require("reddit-wrapper-v2");
// const dotenv = require('dotenv').config()

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

redditWrapper.api
  .get("/user/dr_steve_bruel/upvoted", {
    limit: 2,
  })
  .then((response) => {
    let responseCode = response[0];
    let responseData = response[1].data.children;

    console.log("Received response (" + responseCode + "): ", responseData);
  });
