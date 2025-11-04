const Order = require("../models/order");
const Product = require("../models/Product");
const Razorpay=require('razorpay');
const crypto = require("crypto");

require('dotenv').config();



const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    let totalAmount = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      // ✅ pick discountedPrice if available, else price
      const finalPrice = product.discountedPrice ?? product.price;
      const subtotal = finalPrice * item.quantity;
      totalAmount += subtotal;

      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: finalPrice,
      });

      // ✅ reduce stock
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = new Order({
      user: req.user.id,
      items: validatedItems,
      shippingAddress,
      paymentMethod,
      totalAmount,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
    });

    const savedOrder = await order.save();
   res.status(201).json({ success: true, savedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};


// Fetch all orders or filter by query params
exports.getOrders = async (req, res) => {
  try {
    const { userId, status, orderId } = req.query;

    // Build dynamic filter object
    const filter = {};
    if (userId) filter.user = userId;
    if (status) filter.status = status;
    if (orderId) filter._id = orderId;

    // Populate related data if needed (e.g., user or items)
    const orders = await Order.find(filter)
      .populate("user", "firstName lastName email")
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};


// ✅ Get all orders of the logged-in user
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user.id; // user info added by your auth middleware

    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, orderId } = req.body;
    const options = {
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: orderId,
    };
console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET ? "Loaded ✅" : "❌ Missing Secret");


    const razorOrder = await razorpay.orders.create(options);

    await Order.findByIdAndUpdate(orderId, {
      razorpayOrderId: razorOrder.id,
    });

    res.json({
      success: true,
      amount: razorOrder.amount,
      currency: razorOrder.currency,
      razorpayOrderId: razorOrder.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create Razorpay order" });
  }
};

// Verify Razorpay payment
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign === razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "paid", razorpayPaymentId: razorpay_payment_id }
      );
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "Signature mismatch" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};