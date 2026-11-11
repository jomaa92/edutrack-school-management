//////////////////////////////////////////////////////
////    Enrollments Controller - createEnrollment ////
//////////////////////////////////////////////////////

import {
  enrollStudent,
  getStudentsByCourseId,
} from "../services/enrollment.service.js";

export async function createEnrollmentController(req, res) {
  try {
    const { courseId } = req.params;
    const { studentId } = req.body;

    const enrollment = await enrollStudent(courseId, studentId);

    return res.status(201).json(enrollment);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      error: {
        message: error.message || "Failed to enroll student",
      },
    });
  }
}

////////////////////////////////////////////////////
//// Enrollments Controller - getCourseStudents ////
////////////////////////////////////////////////////

export async function getCourseStudentsController(req, res) {
  try {
    const { courseId } = req.params;

    const students = await getStudentsByCourseId(courseId, req.user);

    return res.status(200).json(students);
  } catch (error) {
    const statusCode = error.statusCode || 500;

    return res.status(statusCode).json({
      error: {
        message: error.message || "Failed to get course students",
      },
    });
  }
}
