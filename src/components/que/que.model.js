const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  fetchAll: async () => {
    const sql = `SELECT questions.*, options.options FROM questions INNER JOIN options ON questions.id = options.que_id returning *`;

    try {
      const questions = await pool.query(sql);
      return questions.rows;
    } catch (err) {
      throw err;
    }
  },
};
