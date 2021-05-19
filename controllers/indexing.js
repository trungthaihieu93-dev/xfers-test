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
          let currency = await Currency.findOne({ where: { symbol: record.currency } });

          if (!currency) {
            currency = await Currency.create({
              name: record.currency,
              symbol: record.currency,
            });
          }

          await Promise.all(record.rates.map(async (rate) => await Rate.create({
            name: rate.type,
            buyPrice: rate.buyPrice,
            sellPrice: rate.sellPrice,
            timestamp: rate.updatedAt,
            currencyId: currency.id,
          })));

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
