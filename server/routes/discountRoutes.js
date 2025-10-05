const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const upload = require('../middleware/upload');

// Create a new discount and assign products
router.post('/',upload.single('image'), discountController.createDiscount);

// Get all discounts
router.get('/', discountController.getAllDiscounts);


router.get('/active', discountController.getAllActiveDiscounts);


// Get a single discount with its products
router.get('/:discountId', discountController.getDiscountWithProducts);

// Update a discount (optional)
router.put('/:discountId',upload.single('image'), discountController.updateDiscount);

// Delete a discount (optional)
router.delete('/:discountId', discountController.deleteDiscount);

router.patch('/:discountId/toggle', discountController.toggleDiscountActive);


module.exports = router;
