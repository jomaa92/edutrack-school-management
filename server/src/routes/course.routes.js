////////////////////////////////////////////////////
////               Courses Router               ////
////////////////////////////////////////////////////

import { Router } from "express";

import { getCourses, getCourse } from "../controllers/course.controller.js";

import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getCourses);
router.get("/:id", requireAuth, getCourse);

export default router;
