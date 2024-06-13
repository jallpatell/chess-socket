const express = require("express");
const socket = require("socket");
const http = require("http");
const { chess } = require("chess");

const app = express();

const server = http.createServer(app);
const io = socket(server);
const chess = new Chess();
let players = {};
