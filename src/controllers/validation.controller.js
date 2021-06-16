const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const auth = require('../middleware/auth');

const { email, sms } = require('../models/validation');

router.get('/email/:token', async (req, res) => {    

    email(req.params.token, (err, result) => {
        if (!result.success) {
            return res.status(400).json({ message: err });
        } else {
            res.status(200).json({ message: "success" });
        }
    })
})

router.post('/sms/:token', auth, async (req, res) => {

    sms(req.params.token, req.headers.authorization, (err, result) => {
        if (!result.success) {
            return res.status(400).json({ message: err });
        } else {
            res.status(200).json({ message: "success" });
        }
    })

})


module.exports = router;