const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = require('../middleware/auth');

const { validateEmail, validateSms, sendSms, returnStatusValidation } = require('../models/validation');


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

router.get('/status', auth, async (req, res, next) => {
    try {
        const result = await returnStatusValidation(req.headers.authorization)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.get('/resendsms', auth, async (req, res, next) => {
    try {
        const result = await sendSms(req.headers.authorization)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router;