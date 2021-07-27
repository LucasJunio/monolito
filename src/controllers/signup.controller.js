const express = require('express');
const router = express.Router();

const { signup } = require('../models/signup');

// Signup
router.post('/', (req, res, next) => {
    signup(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => next(err));
})

module.exports = router;