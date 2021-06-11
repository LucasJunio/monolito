const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()

const { email } = require('../models/validation');

router.get('/email/:token', async (req, res) => {

    email(req.params.token, req.headers.authorization, (err, result) => {
        if (!result.success) {
            return res.status(400).json({ message: err });
        } else {
            res.status(200).json({ message: "success" });
        }
    })
})

router.post('/sms/:token', async (req, res) => {

    const authHeader = (req.headers.authorization);
    const parts = authHeader.split(' ');
    const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
    
    console.log(decoded.email)

    res.status(201).json({ message: "success" });

})


module.exports = router;