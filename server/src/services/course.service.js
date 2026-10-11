////////////////////////////////////////////////////
////             Courses Service                ////
////////////////////////////////////////////////////

import {
  findAllCourses,
  findCourseById,
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
