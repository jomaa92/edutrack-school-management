import { Router } from "express";
import {
  getUsers,
  getUser,
  createUserController,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUserController);

export default router;
