const { indexPage, getRedditPosts } = require("./controllers");

module.exports = (app) => {
  app.get("/", getRedditPosts);
  app.get('/test-reddit', getRedditPosts)
};
