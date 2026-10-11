import { Router } from "express";
import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller.js";

import { requireAuth, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAdmin, getUsers);
router.get("/:id", requireAdmin, getUser);
router.post("/", requireAdmin, createUserController);
router.patch("/:id", requireAdmin, updateUserController);
router.delete("/:id", requireAdmin, deleteUserController);
export default router;
