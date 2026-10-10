////////////////////////////////////////////////////
////             Login Controller               ////
////////////////////////////////////////////////////
import passport from "passport";

export function login(req, res, next) {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        error: {
          message: info?.message || "Invalid email or password",
        },
      });
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }

      return res.status(200).json({
        message: "Login successful",
        user,
      });
    });
  })(req, res, next);
}

////////////////////////////////////////////////////
////          Get Current User Controller       ////
////////////////////////////////////////////////////

export function getCurrentUser(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: {
        message: "Authentication required",
      },
    });
  }

  return res.status(200).json({
    user: req.user,
  });
}

////////////////////////////////////////////////////
////             Logout Controller              ////
////////////////////////////////////////////////////

export function logout(req, res, next) {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        message: "Logout successful",
      });
    });
  });
}
