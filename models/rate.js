"use strict";
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Rate", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buyPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
};
