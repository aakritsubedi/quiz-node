const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  create: async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, user_id varchar(255) NOT NULL, first_name varchar(100) NOT NULL, last_name varchar(100) NOT NULL, photo varchar(255) NOT NULL, status int DEFAULT 1, created_at DATE NOT NULL, updated_at DATE NOT NULL)`;

    try {
      await pool.query(sql);
      console.log("User table created.");
    } catch (err) {
      throw err;
    }
  },
  drop: async () => {
    const sql = `DROP TABLE IF EXISTS users`;
    try {
      await pool.query(sql);
      console.log("User table deleted.");
    } catch (err) {
      throw err;
    }
  },
};
