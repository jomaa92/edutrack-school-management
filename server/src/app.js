////////////////////////////////////////////////////
////             Express App Setup              ////
////////////////////////////////////////////////////

import express from "express";
import session from "express-session";
import passport from "./config/passport.js";
import usersRouter from "./routes/users.routes.js";

const app = express();

///////////////////////////////////////////////////////////////////
////      Express JSON &  Express Session & Passport Setup     ////
///////////////////////////////////////////////////////////////////

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

////////////////////////////////////////////////////
////          Health Check Endpoint             ////
////////////////////////////////////////////////////

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EduTrack API is running",
  });
});

////////////////////////////////////////////////////
////               API Routes                   ////
////////////////////////////////////////////////////
app.use("/api/users", usersRouter);

export default app;
