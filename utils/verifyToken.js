const jwt = require("jsonwebtoken");
const { createError } = require("../utils/error");

//VerifyToken
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token; //take token from cookies
  if (!token) {
    //if there is no token
    return next(createError(401, "You are not authenticated!"));
  }
  //if there is token id does not mean it is valid lets check
  jwt.verify(token, process.env.JWT_SECRET, (error, userInfo) => {
    if (error) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = userInfo;
    next();
  });
};

//VerifyUser
const verifyUser = (req, res, next) => {
  //to verify user it should be authenticated first
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      //req.user.id is the id that is inside twt token
      next(); //req.params.id is the id passed in the url
    } else {
      //if id dont match and user is nit admin
      return next(createError(403, "You are not authorized!"));
    }
  });
};

//VerifyAdmin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
