const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    //Retrieve token
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Not authorized" });
    }
    //Get payload
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    //Set user
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Not authorized" });
  }
};
