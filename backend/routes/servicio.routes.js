const express = require('express');
const router = express.Router();
const servicioCtrl = require('../controllers/servicio.controller');

const verificarToken = require('../middlewares/auth');
router.get('/', servicioCtrl.getServicios);
router.put('/:id', verificarToken, servicioCtrl.actualizarServicio);
module.exports = router;