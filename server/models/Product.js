const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  images: [{ type: String }], // Multiple image URLs
  stock: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: String,
    required: true
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
    default: null
  },
  discountedPrice: {
    type: Number,
    default: null
  },
  isFeatured: { type: Boolean, default: false },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      comment: { type: String },
      rating: { type: Number, min: 1, max: 5 },
      date: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
