const express = require('express');
const router = express.Router();
const { createConsulta, getConsultas } = require('../controllers/consultasController');

router.post('/consultas', createConsulta);
router.get('/consultas', getConsultas);

module.exports = router;