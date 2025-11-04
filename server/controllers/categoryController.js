const Category = require('../models/Category');

exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // ✅ Cloudinary image URL will be available in req.file.path
    let imageUrl = '';
    if (req.file) {
      imageUrl = req.file.path; // Cloudinary URL
    }

    // ✅ Check if category already exists
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // ✅ Create and save new category
    const category = new Category({
      name,
      image: imageUrl,
    });

    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (err) {
    console.error('Error adding category:', err);
    res.status(500).json({ error: 'Failed to add category', details: err.message });
  }
};


// Add subcategory to existing category
exports.addSubCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  console.log(name);
  

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const alreadyExists = category.subcategories.some(
      (sub) => sub.name.toLowerCase() === name.toLowerCase()
    );
    if (alreadyExists)
      return res.status(400).json({ message: 'Subcategory already exists' });

    category.subcategories.push({ name });
    await category.save();

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit existing category
exports.editCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // ✅ Check for duplicate name (excluding current category)
    const existing = await Category.findOne({ name, _id: { $ne: id } });
    if (existing) {
      return res.status(400).json({ message: 'Another category with this name already exists' });
    }

    // ✅ Update category name
    category.name = name || category.name;

    // ✅ If a new image is uploaded, upload to Cloudinary and replace old one
    if (req.file) {
      // If the category already had an image, delete it from Cloudinary
      if (category.image && category.image.includes('cloudinary.com')) {
        const publicId = category.image.split('/').slice(-1)[0].split('.')[0];
        try {
          await cloudinary.uploader.destroy(`categories/${publicId}`);
        } catch (err) {
          console.warn('Failed to delete old image from Cloudinary:', err.message);
        }
      }

      // ✅ Save new Cloudinary image URL
      category.image = req.file.path;
    }

    await category.save();

    res.status(200).json({
      message: 'Category updated successfully',
      category,
    });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Failed to update category', details: err.message });
  }
};


// Delete category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const deleted = await Category.findByIdAndDelete(categoryId);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit subcategory name
exports.editSubCategory = async (req, res) => {
  const { categoryId, subcategoryId } = req.params;
  const { name } = req.body;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subCategory = category.subcategories.id(subcategoryId);
    if (!subCategory) return res.status(404).json({ message: 'Subcategory not found' });

    subCategory.name = name;
    await category.save();

    res.status(200).json({ message: 'Subcategory updated', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete subcategory
exports.deleteSubCategory = async (req, res) => {
  const { categoryId, subcategoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const subCategory = category.subcategories.id(subcategoryId);
    if (!subCategory) return res.status(404).json({ message: 'Subcategory not found' });

    category.subcategories.pull({ _id: subcategoryId });
    await category.save();

    res.status(200).json({ message: 'Subcategory deleted successfully', category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all categories and subcategories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /category/:id
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
