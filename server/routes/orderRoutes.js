const express = require("express");
const { createOrder, verifyPayment, createRazorpayOrder, getOrders, getMyOrders } = require("../controllers/orderController");
const  protect  = require("../middleware/verifyToken"); // assumes you have JWT auth

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", getOrders);
router.get("/my-orders", protect, getMyOrders);

router.post("/create-razorpay-order", createRazorpayOrder);
router.post("/verify-payment", verifyPayment);

module.exports = router;
