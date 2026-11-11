import { findCourseById } from "../repositories/course.repository.js";

import { findUserById } from "../repositories/users.repository.js";

import {
  findEnrollmentByStudentAndCourse,
  createEnrollment as createEnrollmentRepository,
  findStudentsByCourseId,
} from "../repositories/enrollment.repository.js";

////////////////////////////////////////////////////
////       Enrollments Service - enrollStudent  ////
////////////////////////////////////////////////////

export async function enrollStudent(courseId, studentId) {
  const parsedCourseId = Number(courseId);
  const parsedStudentId = Number(studentId);

  if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
    const error = new Error("Invalid course ID");
    error.statusCode = 400;
    throw error;
  }

  if (!Number.isInteger(parsedStudentId) || parsedStudentId <= 0) {
    const error = new Error("Invalid student ID");
    error.statusCode = 400;
    throw error;
  }

  const course = await findCourseById(parsedCourseId);

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const student = await findUserById(parsedStudentId);

  if (!student) {
    const error = new Error("Student not found");
    error.statusCode = 404;
    throw error;
  }

  if (student.role !== "student") {
    const error = new Error("Selected user is not a student");

    error.statusCode = 400;
    throw error;
  }

  const existingEnrollment = await findEnrollmentByStudentAndCourse(
    parsedStudentId,
    parsedCourseId,
  );

  if (existingEnrollment) {
    const error = new Error("Student is already enrolled in this course");

    error.statusCode = 409;
    throw error;
  }

  const enrollment = await createEnrollmentRepository(
    parsedStudentId,
    parsedCourseId,
  );

  return enrollment;
}

/////////////////////////////////////////////////////////
////     Enrollments Service - getStudentsByCourseId ////
/////////////////////////////////////////////////////////

export async function getStudentsByCourseId(courseId, currentUser) {
  const parsedCourseId = Number(courseId);

  if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
    const error = new Error("Invalid course ID");
    error.statusCode = 400;
    throw error;
  }

  const course = await findCourseById(parsedCourseId);

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  if (
    currentUser.role !== "admin" &&
    !(currentUser.role === "teacher" && course.teacher_id === currentUser.id)
  ) {
    const error = new Error(
      "You are not allowed to view students in this course",
    );

    error.statusCode = 403;
    throw error;
  }

  const students = await findStudentsByCourseId(parsedCourseId);

  return students;
}
