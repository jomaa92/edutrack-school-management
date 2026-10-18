////////////////////////////////////////////////////
////          Courses Controller                ////
////////////////////////////////////////////////////

import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
} from "../services/course.service.js";

export async function getCourses(req, res, next) {
  try {
    const courses = await getAllCourses();

    return res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
}

export async function getCourse(req, res, next) {
  try {
    const { id } = req.params;

    const courseId = Number(id);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({
        error: {
          message: "Invalid course ID",
        },
      });
    }

    const course = await getCourseById(courseId);

    return res.status(200).json(course);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      error: {
        message: error.message || "Failed to get course",
      },
    });
  }
}

////////////////////////////////////////////////////
////       Courses Controller - createCourse    ////
////////////////////////////////////////////////////

export async function createCourseController(req, res) {
  try {
    const { name, description, teacherId } = req.body;

    const course = await createCourse({
      name,
      description,
      teacherId,
    });

    return res.status(201).json(course);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      error: {
        message: error.message || "Failed to create course",
      },
    });
  }
}

////////////////////////////////////////////////////
////    Courses Controller - updateCourse       ////
////////////////////////////////////////////////////

export async function updateCourseController(req, res) {
  try {
    const { id } = req.params;

    const courseId = Number(id);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return res.status(400).json({
        error: {
          message: "Invalid course ID",
        },
      });
    }

    const updatedCourse = await updateCourse(courseId, req.body);

    return res.status(200).json(updatedCourse);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      error: {
        message: error.message || "Failed to update course",
      },
    });
  }
}
