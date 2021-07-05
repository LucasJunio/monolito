const express = require('express');
const router = express.Router();

const { signup } = require('../models/signup');

// Signup
router.post('/', async (req, res) => {

    await signup(req.body, (err, result) => {
        if (!result.success) {
            res.status(400).send(err);
            return;
        } else {
            res.status(201).send({ message: "success", token: result.token });
        }
    })
})

module.exports = router;