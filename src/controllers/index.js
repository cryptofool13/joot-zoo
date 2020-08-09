function indexPage(req, res, next) {
  res.render("index", { title: "Home" });
}

module.exports = { indexPage };
