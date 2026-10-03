import "dotenv/config";
import app from "./app.js";
import pool from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const result = await pool.query("SELECT * FROM users");

    console.log("Database connected:");
    console.log(result.rows[0]);

    app.listen(PORT, () => {
      console.log(`EduTrack API running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
