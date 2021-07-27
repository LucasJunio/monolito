const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = require('../middleware/auth');

const { validateEmail, validateSms } = require('../models/validation');


router.get('/email/:token', (req, res, next) => {

    validateEmail(req.params.token)
        .then(result => res.status(200).send(result))
        .catch(err => next(err));
})

router.get('/sms/:token', auth, async (req, res, next) => {

    validateSms(req.params.token, req.headers.authorization)
        .then(result => res.status(200).send(result))
        .catch(err => next(err));
})


module.exports = router;