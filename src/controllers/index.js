const { getTenPosts } = require("../apis/reddit");
const { client, getAsync } = require("../cache");
const cache = require("../cache");

function indexPage(req, res, next) {
  const posts = getRedditPosts();
  res.render("index", { title: "Home", posts: posts });
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
            url: 'https://www.reddit.com' + post.data.permalink,
            author: post.data.author,
            thumbnail: post.data.thumbnail,

          };
        });
        client.hset("reddit", "posts", JSON.stringify(posts));
        // set expiration
        client.expire("reddit", 120);
        // next(posts);
        res.render('index', {title: "Home", posts})
      });
    } else {
      // serve from cache and reset expiration
      client.expire("reddit", 10);
      // next(JSON.parse(data));
      res.render('index', {title: "Home", posts: JSON.parse(data)})
    }
  });
}

module.exports = { indexPage, getRedditPosts };
