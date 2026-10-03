import { findAllUsers } from "../repositories/users.repository.js";

export async function getAllUsers() {
  const users = await findAllUsers();

  return users;
}
