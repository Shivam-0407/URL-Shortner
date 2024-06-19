const express = require('express');
const { handleGenerateURL, handleGiveShortURL, handleAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/url',handleGenerateURL);
router.get('/:shortId',handleGiveShortURL)
router.get('/analytics/:shortId',handleAnalytics)

module.exports = router