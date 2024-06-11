const express = require('express');
const router = express.Router();
const { getPaquetes, createPaquete } = require('../controllers/paqueteConsultasController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getPaquetes)
  .post(protect, admin, createPaquete);

module.exports = router;