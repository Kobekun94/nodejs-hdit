const express = require('express');
const { getHomepage, getAbc } = require('../controllers/homeController');
const router = express.Router();

router.get('/', getHomepage);
router.get('/abc', getAbc);

module.exports = router;
