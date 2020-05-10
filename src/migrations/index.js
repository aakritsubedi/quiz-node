const users = require("./modules/users.db");

async function createAllTables() {
  await users.create();
}

async function dropAllTables() {
  await users.drop();
}

module.exports = { createAllTables };