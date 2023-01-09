const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.get("/users", authMiddleware, authController.getUsers);

module.exports = router;
