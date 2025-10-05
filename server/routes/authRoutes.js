const express = require("express");
const router = express.Router();
const { signup, verifyOtp, login, adminLogin } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post('/login', login);
router.post('/admin/login', adminLogin);

module.exports = router;