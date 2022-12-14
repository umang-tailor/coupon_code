const jwt = require("jsonwebtoken");
const secretToken = require("../config/secret");

const directiveResolvers = {
  isAuthorized: async (next, source, args, ctx) => {
    try {
      console.log("isAuth");
      const token = extractToken(ctx);
      console.log(token);
      let secret = secretToken();

      const tokenData = await jwt.decode(token, secret);
      if (tokenData) {
        ctx.userData = tokenData;
        return next();
      } else {
        return {
          status: "error",
          message: "unauthorized",
        };
      }
      //   console.log("tokenData :>> ", tokenData);
    } catch (error) {
      console.log("error :>> ", error);
      return {
        status: "error",
        message: "unauthorized",
      };
    }
  },
  hasRole: (next, source, args, ctx) => {
    console.log("========================", args);
    if (role === ADMIN) {
      isAllowed = true;
    } else {
      throw error;
    }
  },
};

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

module.exports = directiveResolvers;
