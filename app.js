const express = require("express");
const socket  = require("socket.io");
const http = require("http");
const { chess } = require("chess.js");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new chess();
let players = {};
currentPlayer = "W";

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: "chess game "});
});

server.listen(3000, function() {
    console.log("listening on port:3000")
});