const users = require("./modules/users.db");
const questions = require("./modules/questions.db");
const options = require("./modules/options.db");

async function createAllTables() {
  await users.create();
  await questions.create();
  await options.create();
}

async function dropAllTables() {
  await users.drop();
  await questions.drop();
  await options.drop();
}

module.exports = { createAllTables };
