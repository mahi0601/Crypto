const express = require('express');
const { getFuturesData } = require('../controllers/futureController');
const router = express.Router();
router.get('/', getFuturesData);
module.exports = router;
