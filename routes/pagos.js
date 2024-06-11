const express = require('express');
const router = express.Router();
const { createPago, getPagos } = require('../controllers/pagosController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createPago)
  .get(protect, getPagos);

module.exports = router;