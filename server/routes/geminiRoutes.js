const express = require('express');
const router = express.Router();
const { generateContent, generateImage } = require('../controllers/geminiController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/',verifyAdmin, generateContent);
router.post('/generate-image', generateImage);

module.exports = router;
