////////////////////////////////////////////////////
////               Courses Router               ////
////////////////////////////////////////////////////

import { Router } from "express";

import {
  getCourses,
  getCourse,
  createCourseController,
  updateCourseController,
  deleteCourseController,
} from "../controllers/course.controller.js";
import { getCourseStudentsController } from "../controllers/enrollment.controller.js";
import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/:courseId/students", requireAuth, getCourseStudentsController);
router.get("/", requireAuth, getCourses);
router.get("/:id", requireAuth, getCourse);
router.post("/", requireAdmin, createCourseController);
router.patch("/:id", requireAdmin, updateCourseController);
router.delete("/:id", requireAdmin, deleteCourseController);

export default router;
