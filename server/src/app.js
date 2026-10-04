import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EduTrack API is running",
  });
});

app.use("/api/users", usersRouter);

export default app;
