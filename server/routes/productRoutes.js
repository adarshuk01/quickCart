const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const verifyAdmin = require('../middleware/verifyAdmin');

// Create product
router.post('/', verifyAdmin, upload.array('images', 5), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

router.get('/search', productController.searchAndFilterProducts);


// Get single product
router.get('/:productId', productController.getProductById);

// Update product
router.put('/:productId', upload.array('images', 5),productController.updateProduct);

// Delete product
router.delete('/:productId', productController.deleteProduct);


module.exports = router;
