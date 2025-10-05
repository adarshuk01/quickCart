const Category = require('../models/Category');

// Add new category
exports.addCategory = async (req, res) => {
  const { name } = req.body;

  let imageUrl = '';
  if (req.file) {
    imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  }

  try {
    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const category = new Category({
      name,
      image: imageUrl,  // ✅ Include image here
    });

    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
  console.log(id);
  

  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check for duplicate name (excluding current category)
    const existing = await Category.findOne({ name, _id: { $ne: id } });
    if (existing) {
      return res.status(400).json({ message: 'Another category with this name already exists' });
    }

    // Update fields
    category.name = name || category.name;

    // If a new image is uploaded, update image URL
    if (req.file) {
      category.image = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    await category.save();

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
