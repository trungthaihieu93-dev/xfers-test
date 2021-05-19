"use strict";

const {
  models: { Currency, Rate },
} = require("../services/db");
const scrap = require("../services/scraping");

module.exports = {
  handleIndexing: async (req, res) => {
    try {
      const data = await scrap();

      if (data) {
        await Promise.all(data.map(async (record) => {
          const query = 1;
        }));

        res.send("Done!");
      } else {
        res.status(500).send(`Error while scraping!`);
      }
    } catch (error) {
      console.log(`${error}`.red);
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },
};
