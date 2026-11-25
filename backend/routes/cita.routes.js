const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/cita.controller');
const verificarToken = require('../middlewares/auth');

router.get('/', verificarToken, citaCtrl.getCitas);
router.post('/', citaCtrl.crearCita);
router.put('/:id', verificarToken, citaCtrl.cambiarEstado);
router.delete('/:id', verificarToken, citaCtrl.eliminarCita);
module.exports = router;