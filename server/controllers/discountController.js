const Discount = require('../models/Discount');
const Product = require('../models/Product');

// Create or update a discount with product IDs
exports.createDiscount = async (req, res) => {
  try {
    const {
      title,
      type,
      value,
      products,
      startDate,
      endDate,
      isActive,
    } = req.body;

    console.log(req.body);
    

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Product list must not be empty.' });
    }

    // ✅ Check all product IDs exist
    const existingProducts = await Product.find({ _id: { $in: products } });
    if (existingProducts.length !== products.length) {
      const missing = products.filter(
        id => !existingProducts.find(p => p._id.toString() === id)
      );
      return res.status(404).json({ error: 'Invalid product IDs', missing });
    }

    // ✅ Check if any of the products are already in another discount
    const conflictingDiscounts = await Discount.find({
      products: { $in: products }
    });

    if (conflictingDiscounts.length > 0) {
      const conflictProductIds = new Set();
      conflictingDiscounts.forEach(d => {
        d.products.forEach(pid => {
          if (products.includes(pid.toString())) {
            conflictProductIds.add(pid.toString());
          }
        });
      });

      return res.status(400).json({
        error: 'Some products are already part of another discount.',
        productIds: Array.from(conflictProductIds),
      });
    }

    // ✅ Process image if uploaded
    let imageUrl = '';
    if (req.file) {
      imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const discount = new Discount({
      title,
      type,
      value,
      products,
      startDate,
      endDate,
      isActive,
      image: imageUrl,
    });

    const savedDiscount = await discount.save();

    // ✅ If active, apply discount to products
    if (isActive) {
      const bulkUpdates = existingProducts.map(product => {
        let discountedPrice = product.price;
        if (type === 'percentage') {
          discountedPrice -= (product.price * value) / 100;
        } else if (type === 'fixed') {
          discountedPrice -= value;
        }
        if (discountedPrice < 0) discountedPrice = 0;

        return {
          updateOne: {
            filter: { _id: product._id },
            update: {
              $set: {
                discount: savedDiscount._id,
                discountedPrice: Math.round(discountedPrice),
              },
            },
          },
        };
      });

      await Product.bulkWrite(bulkUpdates);
    }

    res.status(201).json(savedDiscount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create discount', details: err.message });
  }
};

// Toggle isActive for a discount
exports.toggleDiscountActive = async (req, res) => {
  try {
    const { discountId } = req.params;
    const { isActive } = req.body;

    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    discount.isActive = isActive;
    await discount.save();

    // Optional: update discounted prices if needed
    if (isActive) {
      const products = await Product.find({ _id: { $in: discount.products } });

      const bulkUpdates = products.map(product => {
        let discountedPrice = product.price;
        if (discount.type === 'percentage') {
          discountedPrice -= (product.price * discount.value) / 100;
        } else if (discount.type === 'fixed') {
          discountedPrice -= discount.value;
        }
        if (discountedPrice < 0) discountedPrice = 0;

        return {
          updateOne: {
            filter: { _id: product._id },
            update: {
              $set: {
                discount: discount._id,
                discountedPrice: Math.round(discountedPrice),
              },
            },
          },
        };
      });

      await Product.bulkWrite(bulkUpdates);
    } else {
      // If turning off, remove discount and discountedPrice from products
      await Product.updateMany(
        { discount: discount._id },
        { $unset: { discount: '', discountedPrice: '' } }
      );
    }

    res.status(200).json({ message: 'Discount status updated', discount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to toggle discount status', details: err.message });
  }
};




// Get all discounts
exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find().populate('products');
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
};

// Get all active discounts
exports.getAllActiveDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find({isActive:true}).populate('products');
    res.json(discounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch discounts' });
  }
};

// Get a single discount with populated products
exports.getDiscountWithProducts = async (req, res) => {
  try {
    const { discountId } = req.params;

    const discount = await Discount.findById(discountId)
      .populate('products');

    if (!discount) return res.status(404).json({ error: 'Discount not found' });

    res.json(discount);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch discount' });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;
    console.log(discountId);

    const {
      title,
      type,
      value,
      products,
      startDate,
      endDate,
      isActive,
    } = req.body;

    console.log(req.body);

    // If image file is uploaded
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: 'Product list must not be empty.' });
    }

    // Validate product existence
    const existingProducts = await Product.find({ _id: { $in: products } });
    if (existingProducts.length !== products.length) {
      const missing = products.filter(
        id => !existingProducts.find(p => p._id.toString() === id)
      );
      return res.status(404).json({ error: 'Invalid product IDs', missing });
    }

    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    // Check if any product is in another discount
    const conflictingDiscounts = await Discount.find({
      _id: { $ne: discountId },
      products: { $in: products }
    });

    if (conflictingDiscounts.length > 0) {
      const conflictProductIds = new Set();
      conflictingDiscounts.forEach(d => {
        d.products.forEach(pid => {
          if (products.includes(pid.toString())) {
            conflictProductIds.add(pid.toString());
          }
        });
      });

      return res.status(400).json({
        error: 'Some products are already part of another discount.',
        productIds: Array.from(conflictProductIds),
      });
    }

    // Remove discount reference from previously assigned products
    await Product.updateMany(
      { discount: discount._id },
      { $set: { discount: null, discountedPrice: null } }
    );

    // Update discount fields
    discount.title = title;
    discount.type = type;
    discount.value = value;
    discount.products = products;
    discount.startDate = startDate;
    discount.endDate = endDate;
    discount.isActive = isActive;
    if (image) discount.image = image;

    await discount.save();

    if (isActive=="true") {
      // If active, apply discount to products
      const bulkUpdates = existingProducts.map(product => {
        let discountedPrice = product.price;
        if (type === 'percentage') {
          discountedPrice -= (product.price * value) / 100;
        } else if (type === 'fixed') {
          discountedPrice -= value;
        }
        if (discountedPrice < 0) discountedPrice = 0;

        return {
          updateOne: {
            filter: { _id: product._id },
            update: {
              $set: {
                discount: discount._id,
                discountedPrice: Math.round(discountedPrice),
              },
            },
          },
        };
      });

      await Product.bulkWrite(bulkUpdates);
    } else {
      console.log('products');
      
      // If not active, ensure discount fields are cleared
      await Product.updateMany(
        { _id: { $in: products } },
        {
          $set: {
            discount: null,
            discountedPrice: null,
          },
        }
      );
    }

    res.json(discount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update discount' });
  }
};




exports.deleteDiscount = async (req, res) => {
  try {
    const discountId = req.params.discountId;

    // 1. Find the discount
    const discount = await Discount.findById(discountId);

    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    // 2. Update products: remove discount and discountedPrice
    await Product.updateMany(
      { discount: discountId },
      {
        $set: {
          discount: null,
          discountedPrice: null
        }
      }
    );

    // 3. Delete the discount
    await Discount.findByIdAndDelete(discountId);

    res.json({ message: 'Discount and associated product prices removed successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete discount' });
  }
};
