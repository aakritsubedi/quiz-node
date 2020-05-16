const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  create: async () => {
    const sql = `CREATE TABLE IF NOT EXISTS options(id SERIAL PRIMARY KEY, que_id INTEGER NOT NULL, options TEXT [], FOREIGN KEY (que_id) REFERENCES questions (id) ON DELETE CASCADE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

    try {
      await pool.query(sql);
      console.log("Options table created.");
    } catch (err) {
      throw err;
    }
  },
  drop: async () => {
    const sql = `DROP TABLE IF EXISTS options`;
    try {
      await pool.query(sql);
      console.log("Options table deleted.")
    } catch (err) {
      throw err;
    }
  },
};
