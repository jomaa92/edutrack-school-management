////////////////////////////////////////////////////
////             Courses Service                ////
////////////////////////////////////////////////////
import { findUserById } from "../repositories/users.repository.js";
import {
  findAllCourses,
  findCourseById,
  createCourse as createCourseRepository,
  updateCourseById,
} from "../repositories/course.repository.js";

export async function getAllCourses() {
  const courses = await findAllCourses();

  return courses;
}

export async function getCourseById(id) {
  const course = await findCourseById(id);

  if (!course) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  return course;
}

////////////////////////////////////////////////////
////          Courses Service - createCourse    ////
////////////////////////////////////////////////////

export async function createCourse({ name, description, teacherId }) {
  if (!name || !teacherId) {
    const error = new Error("Name and teacherId are required");

    error.statusCode = 400;

    throw error;
  }

  const parsedTeacherId = Number(teacherId);

  if (!Number.isInteger(parsedTeacherId) || parsedTeacherId <= 0) {
    const error = new Error("Invalid teacher ID");
    error.statusCode = 400;

    throw error;
  }

  const teacher = await findUserById(parsedTeacherId);

  if (!teacher) {
    const error = new Error("Teacher not found");
    error.statusCode = 404;

    throw error;
  }

  if (teacher.role !== "teacher") {
    const error = new Error("Selected user is not a teacher");

    error.statusCode = 400;

    throw error;
  }

  const course = await createCourseRepository({
    name: name.trim(),
    description: description?.trim() || null,
    teacherId: parsedTeacherId,
  });

  return course;
}

////////////////////////////////////////////////////
////           Courses Service - updateCourse   ////
////////////////////////////////////////////////////

export async function updateCourse(id, updates) {
  const existingCourse = await findCourseById(id);

  if (!existingCourse) {
    const error = new Error("Course not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ["name", "description", "teacherId"];

  const updateKeys = Object.keys(updates);

  if (updateKeys.length === 0) {
    const error = new Error("No fields provided for update");
    error.statusCode = 400;
    throw error;
  }

  const hasInvalidField = updateKeys.some(
    (key) => !allowedFields.includes(key),
  );

  if (hasInvalidField) {
    const error = new Error("Invalid field in update");
    error.statusCode = 400;
    throw error;
  }

  const cleanUpdates = { ...updates };

  if (cleanUpdates.name !== undefined) {
    cleanUpdates.name = cleanUpdates.name.trim();

    if (!cleanUpdates.name) {
      const error = new Error("Course name cannot be empty");
      error.statusCode = 400;
      throw error;
    }
  }

  if (cleanUpdates.description !== undefined) {
    cleanUpdates.description =
      cleanUpdates.description === null
        ? null
        : cleanUpdates.description.trim();
  }

  if (cleanUpdates.teacherId !== undefined) {
    const parsedTeacherId = Number(cleanUpdates.teacherId);

    if (!Number.isInteger(parsedTeacherId) || parsedTeacherId <= 0) {
      const error = new Error("Invalid teacher ID");
      error.statusCode = 400;
      throw error;
    }

    const teacher = await findUserById(parsedTeacherId);

    if (!teacher) {
      const error = new Error("Teacher not found");
      error.statusCode = 404;
      throw error;
    }

    if (teacher.role !== "teacher") {
      const error = new Error("Selected user is not a teacher");

      error.statusCode = 400;
      throw error;
    }

    cleanUpdates.teacherId = parsedTeacherId;
  }

  const updatedCourse = await updateCourseById(id, cleanUpdates);

  return updatedCourse;
}
