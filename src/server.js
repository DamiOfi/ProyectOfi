const express = require("express");
const router = require("./routers/index");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

server.use(router);

module.exports = server;
