//User Authentication using /register - user creation and /login - return the JWT token (we defined it in authcontroller.js)
// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST /register
router.post('/register', register);//imp line as it ties the register controller to the /register endpoint

// POST /login
router.post('/login', login);//imp line as it ties the login controller to the /login endpoint

module.exports = router;