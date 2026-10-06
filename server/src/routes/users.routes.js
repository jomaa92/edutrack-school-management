import { Router } from "express";
import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUserController);
router.patch("/:id", updateUserController);
export default router;
