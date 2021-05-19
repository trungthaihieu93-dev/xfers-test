"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Currency", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
