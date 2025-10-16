// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

router.put('/gallabox', webhookController.saveGender);

module.exports = router;


