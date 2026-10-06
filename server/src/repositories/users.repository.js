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

////////////////////////////////////////////////////
////             Update User By ID              ////
////////////////////////////////////////////////////

export async function updateUserById(id, updates) {
  const fields = [];
  const values = [];
  let parameterIndex = 1;

  if (updates.firstName !== undefined) {
    fields.push(`first_name = $${parameterIndex++}`);
    values.push(updates.firstName);
  }

  if (updates.lastName !== undefined) {
    fields.push(`last_name = $${parameterIndex++}`);
    values.push(updates.lastName);
  }

  if (updates.email !== undefined) {
    fields.push(`email = $${parameterIndex++}`);
    values.push(updates.email);
  }

  if (updates.role !== undefined) {
    fields.push(`role = $${parameterIndex++}`);
    values.push(updates.role);
  }

  if (fields.length === 0) {
    return null;
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE users
      SET ${fields.join(", ")}
      WHERE id = $${parameterIndex}
      RETURNING
        id,
        first_name,
        last_name,
        email,
        role
    `,
    values,
  );

  return result.rows[0];
}
