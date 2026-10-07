////////////////////////////////////////////////////
////        Passport Local Strategy Setup       ////
////////////////////////////////////////////////////

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import {
  findUserForAuthentication,
  findUserById,
} from "../repositories/users.repository.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        const normalizedEmail = email.trim().toLowerCase();

        const user = await findUserForAuthentication(normalizedEmail);

        if (!user) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        const passwordMatches = await bcrypt.compare(
          password,
          user.password_hash,
        );

        if (!passwordMatches) {
          return done(null, false, {
            message: "Invalid email or password",
          });
        }

        delete user.password_hash;

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
