import { Router } from "express";
import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUserController);
router.patch("/:id", updateUserController);
router.delete("/:id", deleteUserController);
export default router;
