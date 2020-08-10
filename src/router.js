const { indexPage, getRedditPosts } = require("./controllers");

module.exports = (app) => {
  app.get("/", indexPage);
  app.get('/test-reddit', getRedditPosts)
};
