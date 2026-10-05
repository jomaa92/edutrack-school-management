import pool from "../config/database.js";

////////////////////////////////////////////////////
////             Find All Users                 ////
////////////////////////////////////////////////////
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

////////////////////////////////////////////////////
////             Find User By ID                ////
////////////////////////////////////////////////////
export async function findUserById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        first_name,
        last_name,
        email,
        role
      FROM users
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

////////////////////////////////////////////////////
////            Find User By Email              ////
////////////////////////////////////////////////////
export async function findUserByEmail(email) {
  const result = await pool.query(
    `
     SELECT
      id,
      first_name,
      last_name,
      email,
      role
     FROM users
     WHERE email = $1
   `,
    [email],
  );

  return result.rows[0];
}

////////////////////////////////////////////////////
////              Create User                   ////
////////////////////////////////////////////////////
export async function createUser({
  firstName,
  lastName,
  email,
  passwordHash,
  role,
}) {
  const result = await pool.query(
    `
      INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        role
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING
        id,
        first_name,
        last_name,
        email,
        role
    `,
    [firstName, lastName, email, passwordHash, role],
  );

  return result.rows[0];
}
