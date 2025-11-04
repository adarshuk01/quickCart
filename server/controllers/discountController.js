const Discount = require('../models/Discount');
const Product = require('../models/Product');

// Create or update a discount with product IDs
const { cloudinary } = require('../config/cloudinary');

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

    console.log('Request body:', req.body);

    // ✅ Ensure products list is valid
    const productArray = Array.isArray(products)
      ? products
      : JSON.parse(products || '[]');

    if (!Array.isArray(productArray) || productArray.length === 0) {
      return res.status(400).json({ error: 'Product list must not be empty.' });
    }

    // ✅ Check all product IDs exist
    const existingProducts = await Product.find({ _id: { $in: productArray } });
    if (existingProducts.length !== productArray.length) {
      const missing = productArray.filter(
        id => !existingProducts.find(p => p._id.toString() === id)
      );
      return res.status(404).json({ error: 'Invalid product IDs', missing });
    }

    // ✅ Prevent duplicate discounts on same products
    const conflictingDiscounts = await Discount.find({
      products: { $in: productArray },
    });

    if (conflictingDiscounts.length > 0) {
      const conflictProductIds = new Set();
      conflictingDiscounts.forEach(d => {
        d.products.forEach(pid => {
          if (productArray.includes(pid.toString())) {
            conflictProductIds.add(pid.toString());
          }
        });
      });

      return res.status(400).json({
        error: 'Some products are already part of another discount.',
        productIds: Array.from(conflictProductIds),
      });
    }

    // ✅ Handle image upload (Cloudinary)
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL (automatically from multer-storage-cloudinary)
    }

    // ✅ Create discount document
    const discount = new Discount({
      title,
      type,
      value,
      products: productArray,
      startDate,
      endDate,
      isActive,
      image: imageUrl,
    });

    const savedDiscount = await discount.save();

    // ✅ Apply discount to products if active
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
    console.error('Error creating discount:', err);
    res.status(500).json({
      error: 'Failed to create discount',
      details: err.message,
    });
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
    console.log('Updating discount:', discountId);

    const {
      title,
      type,
      value,
      products,
      startDate,
      endDate,
      isActive,
    } = req.body;

    console.log('Request body:', req.body);

    // ✅ Convert products to array (if sent as string)
    const productArray = Array.isArray(products)
      ? products
      : JSON.parse(products || '[]');

    if (!Array.isArray(productArray) || productArray.length === 0) {
      return res.status(400).json({ error: 'Product list must not be empty.' });
    }

    // ✅ Validate product existence
    const existingProducts = await Product.find({ _id: { $in: productArray } });
    if (existingProducts.length !== productArray.length) {
      const missing = productArray.filter(
        id => !existingProducts.find(p => p._id.toString() === id)
      );
      return res.status(404).json({ error: 'Invalid product IDs', missing });
    }

    // ✅ Find discount
    const discount = await Discount.findById(discountId);
    if (!discount) {
      return res.status(404).json({ error: 'Discount not found' });
    }

    // ✅ Check for product conflicts (avoid overlap)
    const conflictingDiscounts = await Discount.find({
      _id: { $ne: discountId },
      products: { $in: productArray },
    });

    if (conflictingDiscounts.length > 0) {
      const conflictProductIds = new Set();
      conflictingDiscounts.forEach(d => {
        d.products.forEach(pid => {
          if (productArray.includes(pid.toString())) {
            conflictProductIds.add(pid.toString());
          }
        });
      });

      return res.status(400).json({
        error: 'Some products are already part of another discount.',
        productIds: Array.from(conflictProductIds),
      });
    }

    // ✅ Remove discount ref from previously assigned products
    await Product.updateMany(
      { discount: discount._id },
      { $set: { discount: null, discountedPrice: null } }
    );

    // ✅ Handle new image upload (and delete old one if needed)
    if (req.file) {
      // Delete old Cloudinary image if exists
      if (discount.image && discount.image.includes('cloudinary.com')) {
        try {
          const publicId = discount.image.split('/').slice(-1)[0].split('.')[0];
          await cloudinary.uploader.destroy(`discounts/${publicId}`);
          console.log('Old image deleted from Cloudinary');
        } catch (err) {
          console.warn('Failed to delete old Cloudinary image:', err.message);
        }
      }

      // Assign new Cloudinary URL (multer-storage-cloudinary sets req.file.path)
      discount.image = req.file.path;
    }

    // ✅ Update discount fields
    discount.title = title;
    discount.type = type;
    discount.value = value;
    discount.products = productArray;
    discount.startDate = startDate;
    discount.endDate = endDate;
    discount.isActive = isActive === 'true' || isActive === true;

    await discount.save();

    // ✅ Apply or clear product discounts
    if (discount.isActive) {
      const bulkUpdates = existingProducts.map(product => {
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
      // Clear discount references if inactive
      await Product.updateMany(
        { _id: { $in: productArray } },
        { $set: { discount: null, discountedPrice: null } }
      );
    }

    res.json({
      message: 'Discount updated successfully',
      discount,
    });
  } catch (err) {
    console.error('Error updating discount:', err);
    res.status(500).json({ error: 'Failed to update discount', details: err.message });
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
