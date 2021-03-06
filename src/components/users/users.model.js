const util = require("util");
const pool = require("../../utils/db/dbConnect");

pool.query = util.promisify(pool.query);

module.exports= {
  create: async ({ user_id, first_name, last_name, photo, email}) => {
    const sql = `INSERT INTO users(user_id, first_name, last_name, photo, email) VALUES('${user_id}', '${first_name}', '${last_name}', '${photo}', '${email}') returning *`;

    try {
      const user = await pool.query(sql);
      return user.rows;
    } catch (err) {
      throw err;
    }
  },
  fetch: async () => {
    const sql = `SELECT * FROM users WHERE status = 1`;

    try {
      const users = await pool.query(sql);
      return users.rows;
    } catch (err) {
      throw err;
    }
  },
  fetchById: async (id) => {
    const sql = `SELECT * FROM users WHERE id=${id} AND status = 1`;

    try {
      const users = await pool.query(sql);
      return users.rows;
    } catch (err) {
      throw err;
    }
  },
  update: async ({id, user_id, first_name, last_name, photo, email}) => {
    const sql = `UPDATE users SET user_id='${user_id}', first_name='${first_name}', last_name='${last_name}', photo='${photo}', email='${email}' WHERE id=${id} returning *`;

    try {
      const user = await pool.query(sql);
      return user.rows;
    } catch (err) {
      throw err;
    }
  },
  remove: async (id) => {
    const sql = `UPDATE users SET status = 0 WHERE id=${id} returning *`;
    
    try {
      const user = await pool.query(sql);
      return user.rows;
    } catch (err) {
      throw err;
    }
  },
  fetchByEmail: async (email) => {
    const sql = `SELECT * FROM users WHERE email='${email}'`;
    
    try {
      const user = await pool.query(sql);
      return user.rows;
    } catch (err) {
      throw err;
    }
  }
}