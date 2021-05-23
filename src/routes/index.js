const express = require('express')
const router = express.Router();
const authMiddleware = require('../middleware/auth.js')

router.use('/teste', (req, res) => { res.status(200).send("Hello World"); })  

router.use('/signup', require('./signup.controller'))
// router.use('/auth', require('./auth.controller'))
// router.use('/user', authMiddleware, require('./user.controller'))

module.exports = router;