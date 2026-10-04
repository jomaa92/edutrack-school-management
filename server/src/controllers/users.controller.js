import { getAllUsers } from "../services/users.service";

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
