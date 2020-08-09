const { indexPage } = require("./controllers");

module.exports = (app) => {
  app.get("/", indexPage);
  
};
