////////////////////////////////////////////////////
////               Courses Router               ////
////////////////////////////////////////////////////

import { Router } from "express";

import {
  getCourses,
  getCourse,
  createCourseController,
} from "../controllers/course.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getCourses);
router.get("/:id", requireAuth, getCourse);
router.post("/", requireAdmin, createCourseController);

export default router;
