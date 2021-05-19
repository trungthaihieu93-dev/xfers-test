const { Sequelize } = require("sequelize");
require("colors");

module.exports = async () => {
  try {
    const uri = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

    const sequelize = new Sequelize(uri);

    await sequelize.authenticate();
    console.log("Connection to DB has been established successfully!".green);

    return sequelize;
  } catch (error) {
    console.log(`Error connecting to DB: ${error}`.red);
  }
};
