import bcrypt from "bcrypt";
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser as createUserRepository,
} from "../repositories/users.repository.js";

////////////////////////////////////////////////////
////              Get All Users                 ////
////////////////////////////////////////////////////
export async function getAllUsers() {
  const users = await findAllUsers();

  return users;
}

////////////////////////////////////////////////////
////              Get User By ID                ////
////////////////////////////////////////////////////
export async function getUserById(id) {
  const users = await findUserById(id);

  return users;
}

////////////////////////////////////////////////////
////               Create User                  ////
////////////////////////////////////////////////////
export async function createUser({
  firstName,
  lastName,
  email,
  password,
  role,
}) {
  if (!firstName || !lastName || !email || !password || !role) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  const allowedRoles = ["admin", "teacher", "student"];

  if (!allowedRoles.includes(role)) {
    const error = new Error("Invalid role");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await createUserRepository({
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    email: normalizedEmail,
    passwordHash,
    role,
  });

  return user;
}
