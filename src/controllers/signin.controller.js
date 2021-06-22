const express = require('express');
const router = express.Router();

const { sigin } = require('../models/user');

// Signup user
router.post('/', async (req, res) => {

    sigin(req.body, (err, result) => {
        if (!result.success) {
            return res.status(400).json({ message: err });
        } else {
            res.status(200).json({ message: "success ", token: result.token });
        }
    })
})


module.exports = router;