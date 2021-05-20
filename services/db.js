const { Sequelize } = require("sequelize");
require("colors");
require("dotenv").config();

const getCurrencyModel = require("../models/currency");
const getRateModel = require("../models/rate");

const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(uri, { logging: false });

// initiate models
const Currency = getCurrencyModel(sequelize);
const Rate = getRateModel(sequelize);

// initiate relations
// rate
Rate.belongsTo(Currency, { foreignKey: 'currencyId' });

module.exports = sequelize;
