// add modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");

const initiateDB = require("./services/db");
const indexRoute = require("./routes");
const indexingRoute = require("./routes/indexing");
const kursRoute = require("./routes/kurs");

// initiate
const server = express();
dotenv.config();
let sequelizeInstance = null;

// apply middlewares
server.use(cors());
server.use(express.json());

// apply routes
server.use("/", indexRoute);
server.use("/api/indexing", indexingRoute);
server.use("/api/kurs", kursRoute);

// connect db
initiateDB().then((seq) => (sequelizeInstance = seq));

// run server
server.listen(parseInt(process.env.PORT, 10), () =>
  console.log(
    `Server is running at ${process.env.HOST}:${process.env.PORT}`.green
  )
);
