const { createRazorpayOrder, verifyPayment } = require("../controllers/paymentController");
const express = require("express");

const router = express.Router();

router.post("/create-order", createRazorpayOrder);
router.post("/verify", verifyPayment);

module.exports = router;