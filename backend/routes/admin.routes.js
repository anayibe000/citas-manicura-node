const { Router } = require('express');
const router = Router();
const adminCtrl = require('../controllers/admin.controller');

router.post('/login', adminCtrl.login);

module.exports = router;