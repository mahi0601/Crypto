const express = require('express');
const { getSpotData } = require('../controllers/spotController');
const router = express.Router();
router.get('/', getSpotData);
module.exports = router;