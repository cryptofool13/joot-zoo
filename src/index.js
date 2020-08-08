const express = require("express");
const http = require("http");
const path = require('path')

const PORT = 3000;

const app = express();

app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', process.cwd() + '/src/views')

app.get("/", (req, res) => {
  res.render('index', {title: 'Home'});
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
