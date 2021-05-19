const { Sequelize } = require("sequelize");
require("colors");

const getCurrencyModel = require("../models/currency");
const getRateModel = require("../models/rate");

module.exports = async () => {
  try {
    const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    const sequelize = new Sequelize(uri);

    // initiate models
    const Currency = getCurrencyModel(sequelize);
    const Rate = getRateModel(sequelize);

    // initiate relations
    Currency.belongsToMany(Rate, { through: "CurrencyRate" });
    Rate.belongsToMany(Currency, { through: "CurrencyRate" });

    await sequelize.authenticate();

    sequelize.sync({ alter: true });

    console.log("Connection to DB has been established successfully!".green);

    return sequelize;
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`.red);
  }
};