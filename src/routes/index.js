const router = require('express').Router();

const auth = require('../middleware/auth');

router.use('/signup', require('../controllers/signup.controller'))  
router.use('/signin', require('../controllers/signin.controller'))  
router.use('/validation', require('../controllers/validation.controller'))  

module.exports = router;