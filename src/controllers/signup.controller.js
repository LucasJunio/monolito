const express = require('express');
const router = express.Router();

const { create, read } = require('../models/user');

// Signup user
router.post('/', async (req, res) => {

    await create(req.body, (err, result) => {
        if (!result) {
            return res.status(400).json({ message: err });
        } else {
            read(req.body, (err, result) => {
                if (!result.success) {
                    return res.status(400).json({ message: err });
                } else {
                    res.status(201).json({ message: "success", token: result.token });
                }
            })
        }
    })
})


module.exports = router;