////////////////////////////////////////////////////
////         Authentication Middleware          ////
////////////////////////////////////////////////////
export function requireAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: {
        message: "Authentication required",
      },
    });
  }

  next();
}

////////////////////////////////////////////////////
////          Admin Authorization Middleware    ////
////////////////////////////////////////////////////

export function requireAdmin(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      error: {
        message: "Authentication required",
      },
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: {
        message: "Admin access required",
      },
    });
  }

  next();
}
