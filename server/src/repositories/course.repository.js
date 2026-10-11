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
