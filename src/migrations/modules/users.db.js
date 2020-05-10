const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  create: async () => {
    const sql = `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, user_id varchar(255) NOT NULL, first_name varchar(100) NOT NULL, last_name varchar(100) NOT NULL, photo varchar(255) NOT NULL, email varchar(255) UNIQUE,status int DEFAULT 1, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    try {
      await pool.query(sql);
    } catch (err) {
      throw err;
    }
  },
  drop: async () => {
    const sql = `DROP TABLE IF EXISTS users`;
    try {
      await pool.query(sql);
    } catch (err) {
      throw err;
    }
  },
};
