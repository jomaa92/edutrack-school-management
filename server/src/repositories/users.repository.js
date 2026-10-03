import pool from "../config/database.js";

export async function findAllUsers() {
  const result = await pool.query(`
    SELECT
      id,
      first_name,
      last_name,
      email,
      role
    FROM users
    ORDER BY id
  `);

  return result.rows;
}
