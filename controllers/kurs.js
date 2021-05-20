"use strict";
const {
  models: { Currency, Rate }
} = require('../services/db');

module.exports = {
  handleRead: async (req, res) => {
    try {

    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleCreate: async (req, res) => {
    try {

    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleUpdate: async (req, res) => {
    try {

    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  },

  handleDeleteByDate: async (req, res) => {
    try {
      const { date } = req.params;
      
    } catch (error) {
      res.status(500).send(`Internal Server Error: ${error}`);
    }
  }
};
