const { indexPage, testReddit } = require("./controllers");

module.exports = (app) => {
  app.get("/", indexPage);
  app.get('/test-reddit', testReddit)
};
