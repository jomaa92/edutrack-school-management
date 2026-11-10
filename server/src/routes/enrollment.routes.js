////////////////////////////////////////////////////
////             Enrollments Router             ////
////////////////////////////////////////////////////

import { Router } from "express";

import { createEnrollmentController } from "../controllers/enrollment.controller.js";

import { requireAdmin } from "../middleware/auth.middleware.js";

const router = Router({
  mergeParams: true,
});

router.post("/", requireAdmin, createEnrollmentController);

export default router;
