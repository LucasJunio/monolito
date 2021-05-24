const router = require('express').Router();

const token = require('../middleware/auth');

router.use('/signup', require('../controllers/signup.controller'))  

module.exports = router;