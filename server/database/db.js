const Sequelize = require("sequelize");
const chalk = require("chalk");

console.log(chalk.blueBright("Opening database connection"));

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/boilerplate",
  {
    logging: false
  }
);

module.exports = db;
