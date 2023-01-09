const jwt = require("jsonwebtoken");
module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }

    try {
      //Retrieve token
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({ message: "Not authorized" });
      }
      const { roles: userRoles } = jwt.verify(token, process.env.JWT_KEY);
      const allowedRoles = userRoles.filter((role) => roles.includes(role));
      if (!allowedRoles.length) {
        return res.status(403).json({ message: "Acces denied" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Not authorized" });
    }
  };
};
