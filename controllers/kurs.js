"use strict";
const { Op, where } = require('sequelize');

const {
  models: { Currency, Rate }
} = require('../services/db');

module.exports = {
  handleRead: async (req, res) => {
    try {
      const {
        startdate,
        enddate,
        symbol,
      } = req.query;

      const currencyAggregation = {
        model: Currency,
        where: {
          symbol,
        }
      }

      if (!symbol) {
        delete currencyAggregation.where;
      }

      const maxDate = new Date(enddate);
      maxDate.setHours(23);
      maxDate.setMinutes(59);

      const rates = await Rate.findAll({
        where: {
          timestamp: {
            [Op.between]: [new Date(startdate), maxDate]
          }
        },
        include: currencyAggregation,
      });

      res.status(200).json(rates);
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleCreate: async (req, res) => {
    try {
      const {
        symbol,
        rates,
        date,
      } = req.body;

      const existedCurrency = await Currency.findOne({ where: { symbol } });

      if (!existedCurrency) {
        const currency = await Currency.create({
          name: symbol,
          symbol,
        });

        const createdRates = await Promise.all(rates.map(async (rate) => await Rate.create({
          name: rate.type,
          buyPrice: rate.buy,
          sellPrice: rate.sell,
          timestamp: new Date(date),
          currencyId: currency.id,
        })));

        res.status(200).json({
          symbol,
          rates: createdRates,
          date
        });
      } else {
        res.status(500).send('Currency existed!');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleUpdate: async (req, res) => {
    try {
      const {
        symbol,
        rates,
        date,
      } = req.body;

      const existedCurrency = await Currency.findOne({ where: { symbol } });

      if (existedCurrency) {

        const createdRates = await Promise.all(rates.map(async (rate) => await Rate.create({
          name: rate.type,
          buyPrice: rate.buy,
          sellPrice: rate.sell,
          timestamp: new Date(date),
          currencyId: existedCurrency.id,
        })));

        res.status(200).json({
          symbol,
          rates: createdRates,
          date
        });
      } else {
        res.status(404).send('Currency not found!');
      }
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleDeleteByDate: async (req, res) => {
    try {
      const { date } = req.params;

      const minDate = new Date(date);
      const maxDate = new Date(date);
      maxDate.setHours(23);
      maxDate.setMinutes(59);

      const rowsNum = await Rate.destroy({ where: { timestamp: { [Op.between]: [minDate, maxDate] } } });

      res.status(200).send(`${rowsNum} record(s) deleted!`);
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
};
