import "dotenv/config";
import { findAllUsers } from "./repositories/users.repository.js";

try {
  const users = await findAllUsers();
  console.log(users);
} catch (error) {
  console.log("failed to load users:");
  console.log(error);
  process.exit(1);
}
