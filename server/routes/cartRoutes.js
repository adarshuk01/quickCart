// routes/cartRoutes.js
const express = require("express");
const {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
  clearCart,
} = require("../controllers/cartController");
const verifyToken=require("../middleware/verifyToken")

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCart);
router.put("/update", verifyToken, updateQuantity);
router.delete("/remove", verifyToken, removeFromCart);
router.delete("/clear", verifyToken, clearCart);

module.exports = router;
