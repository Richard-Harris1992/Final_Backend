const router = require('express').Router();
const { create , login } = require('../controllers/userControl');

// creating user
router.post('/', create);

// login user
router.post('/login', login);


module.exports = router
