const { getTenPosts } = require("../apis/reddit");
const { client, getAsync } = require("../cache");
const cache = require("../cache");

function indexPage(req, res, next) {
  res.render("index", { title: "Home" });
}

function getRedditPosts(req, res, next) {
  client.hget("reddit", "posts", (err, data) => {
    if (!data) {
      // cache expired
      const response = getTenPosts().then((data) => {
        const posts = data.children.map((post) => {
          return {
            sub: post.data.subreddit_name_prefixed,
            title: post.data.title,
            url: post.data.url,
            author: post.data.author,
            thumbnail: post.data.thumbnail,
          };
        });
        client.hset("reddit", "posts", JSON.stringify(posts));
        // set expiration 
        client.expire('reddit', 10)
        res.json(posts);
      });
    } else {
      // serve from cache and reset expiration
      client.expire('reddit', 10)
      res.json(JSON.parse(data));
    }
  });
}

module.exports = { indexPage, getRedditPosts };
