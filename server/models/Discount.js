const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  value: { type: Number, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
   // New image field (URL or path)
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Discount', discountSchema);
