const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/cita.controller');

router.post('/', citaCtrl.crearCita);

module.exports = router;