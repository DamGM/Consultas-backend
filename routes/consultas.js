const express = require('express');
const router = express.Router();
const { createConsulta, getConsultas } = require('../controllers/consultasController');

router.post('/', createConsulta);
router.get('/', getConsultas);

module.exports = router;