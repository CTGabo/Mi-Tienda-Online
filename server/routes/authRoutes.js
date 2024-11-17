import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Asegúrate de que las funciones register y login existan en authController
router.post('/register', register);
router.post('/login', login);

module.exports = router;