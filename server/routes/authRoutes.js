const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Asegúrate de que las funciones register y login existan en authController
router.post('/register', register);
router.post('/login', login);

module.exports = router;