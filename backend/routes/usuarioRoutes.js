const express = require('express');
const { getReportes } = require('../controllers/usuarioController.js');

const router = express.Router();

router.get('/', getReportes);

module.exports = router;

