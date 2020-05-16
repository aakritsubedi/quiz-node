const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  create: async () => {
    const sql = `CREATE TABLE IF NOT EXISTS questions(id SERIAL PRIMARY KEY, question text NOT NULL,  category varchar(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    try {
      await pool.query(sql);
      console.log("Questions table created.");
    } catch (err) {
      throw err;
    }
  },
  drop: async () => {
    const sql = `DROP TABLE IF EXISTS questions`;
    try {
      await pool.query(sql);
      console.log("Questions table deleted.");
    } catch (err) {
      throw err;
    }
  },
};
