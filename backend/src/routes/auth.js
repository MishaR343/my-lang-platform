const express = require("express");
const router = express.Router();
const { register, login, logout, me, check } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login',    login);
router.post('/logout',   logout);
router.get('/check', authenticate, check);
router.get('/me',    authenticate, me);

module.exports = router; 