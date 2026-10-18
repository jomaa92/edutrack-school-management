////////////////////////////////////////////////////
////          Courses Repository - findAll      ////
////////////////////////////////////////////////////

import pool from "../config/database.js";

export async function findAllCourses() {
  const result = await pool.query(`
    SELECT
      id,
      name,
      description,
      teacher_id,
      created_at,
      updated_at
    FROM courses
    ORDER BY id
  `);

  return result.rows;
}

////////////////////////////////////////////////////
////          Courses Repository - findById     ////
////////////////////////////////////////////////////

export async function findCourseById(id) {
  const result = await pool.query(
    `
      SELECT
        id,
        name,
        description,
        teacher_id,
        created_at,
        updated_at
      FROM courses
      WHERE id = $1
    `,
    [id],
  );

  return result.rows[0];
}

////////////////////////////////////////////////////
////        Courses Repository - createCourse   ////
////////////////////////////////////////////////////

export async function createCourse({ name, description, teacherId }) {
  const result = await pool.query(
    `
      INSERT INTO courses (
        name,
        description,
        teacher_id
      )
      VALUES ($1, $2, $3)
      RETURNING
        id,
        name,
        description,
        teacher_id,
        created_at,
        updated_at
    `,
    [name, description, teacherId],
  );

  return result.rows[0];
}

////////////////////////////////////////////////////
////     Courses Repository - updateCourseById  ////
////////////////////////////////////////////////////

export async function updateCourseById(id, updates) {
  const fields = [];
  const values = [];
  let parameterIndex = 1;

  if (updates.name !== undefined) {
    fields.push(`name = $${parameterIndex++}`);
    values.push(updates.name);
  }

  if (updates.description !== undefined) {
    fields.push(`description = $${parameterIndex++}`);
    values.push(updates.description);
  }

  if (updates.teacherId !== undefined) {
    fields.push(`teacher_id = $${parameterIndex++}`);
    values.push(updates.teacherId);
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE courses
      SET ${fields.join(", ")}
      WHERE id = $${parameterIndex}
      RETURNING
        id,
        name,
        description,
        teacher_id,
        created_at,
        updated_at
    `,
    values,
  );

  return result.rows[0];
}
