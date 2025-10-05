// controllers/cartController.js
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// 👉 Add to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { productId, quantity = 1 } = req.body;

    // find product
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // find cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // check if product already exists in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // product already in cart → check stock & limit before adding
      const newQty = cart.items[itemIndex].quantity + quantity;

      if (newQty > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }

      if (newQty > 10) {
        return res.status(400).json({
          message: "Maximum 10 items allowed per product",
        });
      }

      cart.items[itemIndex].quantity = newQty;
    } else {
      // adding new product → check stock & limit
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }

      if (quantity > 10) {
        return res.status(400).json({
          message: "Maximum 10 items allowed per product",
        });
      }

      cart.items.push({ product: productId, quantity });
    }

    // recalc total
    cart.totalPrice = await calculateTotal(cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 👉 Update item quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not in cart" });

    // enforce stock + max limit
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Only ${product.stock} items available in stock`,
      });
    }

    if (quantity > 10) {
      return res.status(400).json({
        message: "Maximum 10 items allowed per product",
      });
    }

    cart.items[itemIndex].quantity = quantity;

    cart.totalPrice = await calculateTotal(cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 👉 Get user cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) {
      return res.status(200).json({
        items: [],
        itemsCount: 0,
        subTotal: 0,
        totalDiscount: 0,
        deliveryCost: 0,
        tax: 0,
        totalPrice: 0,
        originalTotal: 0, // 👈 added
      });
    }

    let subTotal = 0;       // discounted subtotal
    let totalDiscount = 0;
    let originalTotal = 0;  // 👈 actual price without discount

    const itemsWithDiscount = cart.items.map((item) => {
      const product = item.product;
      const effectivePrice = product.discountedPrice > 0 ? product.discountedPrice : product.price;

      const originalItemTotal = product.price * item.quantity;   // without discount
      const discountedTotal = effectivePrice * item.quantity;    // with discount
      const itemDiscount = originalItemTotal - discountedTotal;

      subTotal += discountedTotal;
      totalDiscount += itemDiscount;
      originalTotal += originalItemTotal; // 👈 accumulate original total

      return {
        ...item.toObject(),
        effectivePrice,
        itemTotal: discountedTotal,
        itemDiscount,
        originalItemTotal, // 👈 add per-item original total
      };
    });

    const deliveryCost = 0;
    const tax = 0;

    const totalPrice = subTotal + deliveryCost + tax;

    res.status(200).json({
      items: itemsWithDiscount,
      itemsCount: cart.items.length,
      subTotal,        // discounted subtotal
      originalTotal,   // 👈 total without discount
      totalDiscount,
      deliveryCost,
      tax,
      totalPrice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// 👉 Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalPrice = await calculateTotal(cart);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 👉 Clear cart
exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.totalPrice = 0;

    await cart.save();
    res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧮 Helper function to calculate total price
async function calculateTotal(cart) {
  let total = 0;
  for (let item of cart.items) {
    const product = await Product.findById(item.product);
    total += product.price * item.quantity;
  }
  return total;
}
