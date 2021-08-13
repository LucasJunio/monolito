const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { createUserAdmin, readUserAdmin } = require('../models/user');

router.get('/',  auth, async (req, res, next) => {
    try {
        const result = await readUserAdmin()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/user-admin',  auth, async (req, res, next) => {
    try {
        const result = await createUserAdmin(req.body)
        res.status(201).send(result)
    } catch (error) {
        next(error)
    }
})


module.exports = router;