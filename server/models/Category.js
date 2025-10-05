const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String },
  subcategories: [subCategorySchema], // Embedded subcategories
  stocks:{default:0,type:Number}
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
