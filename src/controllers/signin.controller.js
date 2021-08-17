const express = require('express');
const router = express.Router();

const { signin, signinAdmin } = require('../models/signin');

// Signin user
router.post('/', async (req, res, next) => {
    try {
        const result = await signin(req.body)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/admin', async (req, res, next) => {
    try {
        const result = await signinAdmin(req.body)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})


module.exports = router;