import bcrypt from "bcrypt";
import {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser as createUserRepository,
  updateUserById,
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

////////////////////////////////////////////////////
////                Update User                 ////
////////////////////////////////////////////////////

export async function updateUser(id, updates) {
  const existingUser = await findUserById(id);

  if (!existingUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = ["firstName", "lastName", "email", "role"];

  const updateKeys = Object.keys(updates);

  if (updateKeys.length === 0) {
    const error = new Error("No fields provided for update");
    error.statusCode = 400;
    throw error;
  }

  const hasInvalidField = updateKeys.some(
    (key) => !allowedFields.includes(key),
  );

  if (hasInvalidField) {
    const error = new Error("Invalid field in update");
    error.statusCode = 400;
    throw error;
  }

  const cleanUpdates = { ...updates };

  if (cleanUpdates.firstName !== undefined) {
    cleanUpdates.firstName = cleanUpdates.firstName.trim();
  }

  if (cleanUpdates.lastName !== undefined) {
    cleanUpdates.lastName = cleanUpdates.lastName.trim();
  }

  if (cleanUpdates.email !== undefined) {
    cleanUpdates.email = cleanUpdates.email.trim().toLowerCase();

    const userWithEmail = await findUserByEmail(cleanUpdates.email);

    if (userWithEmail && userWithEmail.id !== id) {
      const error = new Error("Email already exists");
      error.statusCode = 409;
      throw error;
    }
  }

  if (cleanUpdates.role !== undefined) {
    const allowedRoles = ["admin", "teacher", "student"];

    if (!allowedRoles.includes(cleanUpdates.role)) {
      const error = new Error("Invalid role");
      error.statusCode = 400;
      throw error;
    }
  }

  const updatedUser = await updateUserById(id, cleanUpdates);

  return updatedUser;
}
