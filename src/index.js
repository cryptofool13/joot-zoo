const dotenv = require("dotenv").config();
const express = require("express");
const http = require("http");
const path = require("path");

const router = require("./router");

const PORT = 3000;

const app = express();

app.use(express.static("public"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

router(app);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
