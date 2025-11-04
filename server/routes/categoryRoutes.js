const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyAdmin = require('../middleware/verifyAdmin');
const { upload } = require('../config/cloudinary');


// Category routes
router.post('/category',upload.single('image'), categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);
router.patch('/category/:id',upload.single('image'), categoryController.editCategory);
router.delete('/category/:categoryId', categoryController.deleteCategory);
router.get('/category/:id', categoryController.getCategoryById);

// Subcategory routes
router.post('/category/:categoryId/subcategory', categoryController.addSubCategory);
router.patch('/category/:categoryId/subcategory/:subcategoryId', categoryController.editSubCategory);
router.delete('/category/:categoryId/subcategory/:subcategoryId', categoryController.deleteSubCategory);

module.exports = router;
