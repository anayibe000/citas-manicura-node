const express = require('express');
const router = express.Router();
const citaCtrl = require('../controllers/cita.controller');

router.get('/', citaCtrl.getCitas);
router.post('/', citaCtrl.crearCita);
router.put('/:id', citaCtrl.cambiarEstado);
router.delete('/:id', citaCtrl.eliminarCita);

module.exports = router;