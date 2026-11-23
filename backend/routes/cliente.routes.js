const express = require('express');
const router = express.Router();
const clienteCtrl = require('../controllers/cliente.controller');

router.post('/login', clienteCtrl.login);

module.exports = router;