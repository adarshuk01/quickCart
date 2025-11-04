const Product = require('../models/Product');
const Category = require('../models/Category');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const FormData = require('form-data');
const { cloudinary } = require('../config/cloudinary');



// Helper to remove background
async function removeBackground(filePath, outputFilePath) {
  const formData = new FormData();
  formData.append('image_file', fs.createReadStream(filePath));
  formData.append('size', 'auto');

  try {
    const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
      headers: {
        ...formData.getHeaders(),
        'X-Api-Key': 'vxb3Z7s9hUfSqPGQ5f3NpKsz', // Replace with process.env.REMOVE_BG_API_KEY in production
      },
      responseType: 'arraybuffer',
    });

    if (response.status !== 200) {
      console.error('Remove.bg Error:', response.data);
      throw new Error(`Remove.bg failed: ${response.statusText}`);
    }

    fs.writeFileSync(outputFilePath, response.data);
  } catch (err) {
    console.error('Remove.bg API error:', err.response?.data || err.message);
    throw err;
  }
}

exports.createProduct = async (req, res) => {
  try {
    console.log('Files received:', req.files);

    const {
      name,
      description,
      price,
      stock,
      category,
      subcategory,
      isFeatured,
    } = req.body;

    // ✅ Cloudinary URLs instead of local paths
    const imageUrls = req.files.map((file) => file.path);

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      images: imageUrls, // Cloudinary image URLs
      stock,
      category,
      subcategory,
      isFeatured,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Failed to create product',
      details: err.message,
    });
  }
};



// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('reviews.user');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('category').populate('reviews.user');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category,
      subcategory,
      isFeatured,
      existingImages, // JSON array of old image URLs
    } = req.body;

    let imagePaths = [];

    // ✅ Step 1: Include existing images (from request body)
    if (existingImages) {
      imagePaths = JSON.parse(existingImages); // e.g. ["https://res.cloudinary.com/..."]
    }

    // ✅ Step 2: Upload newly added images to Cloudinary
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // file.path is automatically the Cloudinary URL (thanks to multer-storage-cloudinary)
        imagePaths.push(file.path);
      }
    }

    // ✅ Step 3: Prepare update fields
    const updateFields = {
      name,
      description,
      price,
      stock,
      category,
      subcategory,
      isFeatured,
      images: imagePaths,
    };

    // ✅ Step 4: Update product in DB
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({
      error: 'Failed to update product',
      details: err.message,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.productId);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};


exports.searchAndFilterProducts = async (req, res) => {
  try {
    const { name, category } = req.query;

    console.log('Query received:', req.query);

    // If name is missing or empty, return empty array
    if (!name?.trim()) {
      return res.status(200).json([]);
    }

    const filter = {
      name: { $regex: name, $options: 'i' } // filter by name (case-insensitive)
    };

    // If category is provided, add it to the filter
    if (category?.trim()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
      filter.category = category;
    }

    const products = await Product.find(filter).populate('category');
    res.status(200).json(products);
  } catch (err) {
    console.error('Error in searchAndFilterProducts:', err);
    res.status(500).json({ error: 'Failed to search/filter products', details: err.message });
  }
};


