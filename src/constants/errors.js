module.exports = {
  NOT_FOUND: {
    code: 404,
    message: "Sorry, requested object doesn't exists",
  },
  AUTH_FAILED: {
    code: 409,
    message: "Authentication failed",
  },
  BAD_REQUEST: {
    code: 400,
    message: "Bad request",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden",
  },
  CONFLICT: {
    code: 409,
    message: "Conflict",
  },
  INTERNAL_SERVER_ERROR: {
    code: 500,
    message: "Internal Server Error",
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    message: "Service Unavailable",
  },
  LOGIN_TIME_OUT: {
    code: 440,
    message: "Login Time-out",
  },
};
