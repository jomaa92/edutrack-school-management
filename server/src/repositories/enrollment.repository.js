////////////////////////////////////////////////////
//// Enrollments Repository - findByStudentAndCourse
////////////////////////////////////////////////////

import pool from "../config/database.js";

export async function findEnrollmentByStudentAndCourse(studentId, courseId) {
  const result = await pool.query(
    `
      SELECT
        id,
        student_id,
        course_id,
        enrolled_at
      FROM enrollments
      WHERE student_id = $1
        AND course_id = $2
    `,
    [studentId, courseId],
  );

  return result.rows[0];
}
////////////////////////////////////////////////////
////  Enrollments Repository - createEnrollment ////
////////////////////////////////////////////////////

export async function createEnrollment(studentId, courseId) {
  const result = await pool.query(
    `
      INSERT INTO enrollments (
        student_id,
        course_id
      )
      VALUES ($1, $2)
      RETURNING
        id,
        student_id,
        course_id,
        enrolled_at
    `,
    [studentId, courseId],
  );

  return result.rows[0];
}
