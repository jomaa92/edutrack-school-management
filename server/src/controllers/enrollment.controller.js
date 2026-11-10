//////////////////////////////////////////////////////
////    Enrollments Controller - createEnrollment ////
//////////////////////////////////////////////////////

import { enrollStudent } from "../services/enrollment.service.js";

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
