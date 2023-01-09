const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findOne } = require("../models/User");

const SALT = 7;

const generateAccessToken = (id, roles) => {
  const payload = { id, roles };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
};

const signup = async (req, res) => {
  try {
    //Get props from request
    const { phone, password } = req.body;
    //Find if key prop are existing
    const candidate = await User.findOne({ phone });

    //Return if exist
    if (candidate) {
      return res.status(400).json({ message: "Phone number taken" });
    }

    //Hash password
    const hashPassword = bcrypt.hashSync(password, SALT);
    //Find role
    const userRole = await Role.findOne({ value: "CLIENT" });
    //Create user
    const user = new User({
      phone,
      password: hashPassword,
      roles: [userRole.value],
    });
    //Save user
    await user.save();
    return res.json({ message: "User registered" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};
const signin = async (req, res) => {
  try {
    //Get props
    const { phone, password } = req.body;
    //Find user
    const user = await User.findOne({ phone });
    //If not found
    if (!user) {
      return res.status(400).json("Phone not registered");
    }
    //Check password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Password not match");
    }
    //Generate token
    const token = generateAccessToken(user._id, user.roles);
    return res.json({ token });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Error" });
  }
};

module.exports = { signin, signup };
