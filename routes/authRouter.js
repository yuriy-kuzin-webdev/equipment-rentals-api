const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

module.exports = router;
