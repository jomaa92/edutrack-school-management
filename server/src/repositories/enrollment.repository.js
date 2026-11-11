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

////////////////////////////////////////////////////
//// Enrollments Repository - findStudentsByCourseId
////////////////////////////////////////////////////

export async function findStudentsByCourseId(courseId) {
  const result = await pool.query(
    `
      SELECT
        e.id AS enrollment_id,
        e.enrolled_at,
        u.id AS student_id,
        u.first_name,
        u.last_name,
        u.email
      FROM enrollments e
      JOIN users u
        ON u.id = e.student_id
      WHERE e.course_id = $1
      ORDER BY u.last_name, u.first_name
    `,
    [courseId],
  );

  return result.rows;
}
