const express = require('express');
const router = express.Router();
const { register, verifyOTP, login } = require('../controllers/Controller');//Import from controller

router.post('/register', register);
router.post('/verify', verifyOTP);
router.post('/login', login);

module.exports = router;
