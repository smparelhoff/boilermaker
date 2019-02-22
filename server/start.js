const chalk = require("chalk");
if (process.env.NODE_ENV !== 'production'){
  require('./localsecrets')
}
const app = require("./server");
const { db } = require("./database");

const cookin = chalk.magentaBright.bold;

const PORT = process.env.PORT || 1337;

const startApp = async () => {
  await db.sync();
  console.log(chalk.yellowBright("DB is synced!"));
  app.listen(PORT, () => {
    console.log(cookin("Deep in the heart of the Caribbean..."));
    console.log(cookin("a server is listening on port", PORT));
  });
};

startApp();
