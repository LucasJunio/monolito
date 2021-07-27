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

router.get('/sms/:token', auth, async (req, res) => {

    validateSms(req.params.token, req.headers.authorization, (err, result) => {
        if (!result.success) {
            return res.status(400).json({ message: err });
        } else {
            res.status(200).json({ message: "success" });
        }
    })

})


module.exports = router;