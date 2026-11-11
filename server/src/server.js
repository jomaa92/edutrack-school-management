import "dotenv/config";
import pool from "./config/database.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    const result = await pool.query("SELECT now()");

    console.log("Database connected:");
    console.log(result.rows[0].now);

    app.listen(PORT, () => {
      console.log(`EduTrack API running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
