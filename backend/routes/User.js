const express = require('express');
const router = express.Router();

const {Register , Verify} = require('../controllers/Users/register');
const Login = require('../controllers/Users/login');

router.post('/register' , Register);
router.post('/login' , Login);
router.post('/verify_signup_email/' , Verify)

module.exports = router;