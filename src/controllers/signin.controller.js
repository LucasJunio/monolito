const express = require('express');
const router = express.Router();

const { signin } = require('../models/signin');

// Signin user
router.post('/', async (req, res, next) => {

    signin(req.body)
        .then(result => res.status(200).send(result))
        .catch(err => next(err));    
})


module.exports = router;