const {getTenPosts} = require("../apis/reddit");
const { client, getAsync } = require("../cache");


function indexPage(req, res, next) {
  res.render("index", { title: "Home" });
}

function testReddit(req, res, next) {
  const response = getTenPosts().then(data => {
    // console.log(data.children[0])
    const posts = data.children.map(post =>{
      return {
        sub: post.data.subreddit_name_prefixed,
        title: post.data.title,
        url: post.data.url,
        author: post.data.author,
        thumbnail: post.data.thumbnail
      }
    })
    console.log(posts)
    client.hset('reddit','posts', JSON.stringify(data.children))
    res.json(data.children)
  })
}

module.exports = { indexPage, testReddit };
