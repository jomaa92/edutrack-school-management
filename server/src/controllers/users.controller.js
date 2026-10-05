////////////////////////////////////////////////////
////                  **********                ////
////////////////////////////////////////////////////
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../services/users.service.js";
////////////////////////////////////////////////////
////                  GET-USERS                 ////
////////////////////////////////////////////////////

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();

    res.status(200).json(users);
  } catch (error) {
    console.error("Failed to get users:", error);

    res.status(500).json({
      error: {
        message: "Failed to get users",
      },
    });
  }
}

////////////////////////////////////////////////////
////                  GET-USER                  ////
////////////////////////////////////////////////////

export async function getUser(req, res) {
  try {
    const { id } = req.params;

    const userId = Number(id);

    if (!Number.isInteger(userId) || userId <= 0) {
      return res.status(400).json({
        error: {
          message: "Invalid user ID",
        },
      });
    }

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: {
          message: "User not found",
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Failed to get user:", error);

    res.status(500).json({
      error: {
        message: "Failed to get user",
      },
    });
  }
}

////////////////////////////////////////////////////
////             Create New User                ////
////////////////////////////////////////////////////

export async function createUserController(req, res) {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const user = await createUser({
      firstName,
      lastName,
      email,
      password,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Failed to create user:", error);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      error: {
        message: error.message || "Failed to create user",
      },
    });
  }
}
