const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports = {
  fetchAll: async () => {
    const sql = `SELECT questions.*, options.options FROM questions INNER JOIN options ON questions.id = options.que_id`;

    try {
      const questions = await pool.query(sql);
      return questions.rows;
    } catch (err) {
      throw err;
    }
  },
  fetchByCategory: async (category) => {
    const sql = `SELECT questions.*, options.options FROM questions INNER JOIN options ON questions.id = options.que_id WHERE questions.category='${category}'`;

    try {
      const questions = await pool.query(sql);
      return questions.rows;
    } catch (err) {
      throw err;
    }
  },
  insert: async (questions) => {
    const { question, category, options } = questions;
    let opt = JSON.stringify(options).replace(/"/gi, "'");

    const sql = `WITH que AS (
      INSERT INTO questions(question, category) VALUES('${question}', '${category}') returning id AS que_id ) INSERT INTO options(que_id,options) VALUES( (SELECT que_id   FROM que), Array ${opt})`;
    try {
      const questions = await pool.query(sql);

      return questions.rows;
    } catch (err) {
      throw err;
    }
  },
  update: async (questions) => {
    const { id, question, category, options } = questions;
    let opt = JSON.stringify(options).replace(/"/gi, "'");

    const sql = `WITH que AS (
      UPDATE questions SET question='${question}', category= '${category}' WHERE id=${id} ) UPDATE options SET options=Array ${opt} WHERE que_id=${id}`;
    try {
      const questions = await pool.query(sql);
      console.log(questions);

      return questions.rows;
    } catch (err) {
      throw err;
    }
  },
  delete: async (id) => {
    const sql = `DELETE FROM questions WHERE id=${id}`;
    try {
      const questions = await pool.query(sql);
      return questions;
    } catch (err) {
      throw err;
    }
  },
};
