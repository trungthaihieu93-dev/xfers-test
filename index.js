// add modules
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("colors");

const sequelize = require("./services/db");
const indexRoute = require("./routes");
const indexingRoute = require("./routes/indexing");
const kursRoute = require("./routes/kurs");

// initiate
const server = express();
dotenv.config();

// apply middlewares
server.use(cors());
server.use(express.json());

// apply routes
server.use("/", indexRoute);
server.use("/api/indexing", indexingRoute);
server.use("/api/kurs", kursRoute);

// connect db
sequelize
  .authenticate()
  .then(() => {
    // sync
    sequelize.sync({ alter: true });
    console.log("Connection to DB has been established successfully!".green);
  })
  .catch((err) => {
    console.log(`Error connecting to DB: ${err}`.red);
  });

// run server
server.listen(parseInt(process.env.PORT, 10), () =>
  console.log(
    `Server is running at ${process.env.HOST}:${process.env.PORT}`.green
  )
);
