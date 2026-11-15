const express = require('express');
const router = express.Router();
const servicioCtrl = require('../controllers/servicio.controller');

router.get('/', servicioCtrl.getServicios);

module.exports = router;