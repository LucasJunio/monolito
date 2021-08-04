const router = require('express').Router();

router.use('/signup', require('../controllers/signup.controller'))  
router.use('/signin', require('../controllers/signin.controller'))  
router.use('/validation', require('../controllers/validation.controller'))  
router.use('/person', require('../controllers/person.controller'))  

module.exports = router;