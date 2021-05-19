// add modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");

// initiate
const server = express();
dotenv.config();

// apply middlewares
server.use(cors());
server.use(express.json());

// apply routes
server.get("/", (req, res) => res.send("Hello!"));

// run server
server.listen(parseInt(process.env.PORT, 10), () =>
  console.log(
    `Server is running at ${process.env.HOST}:${process.env.PORT}`.green
  )
);
