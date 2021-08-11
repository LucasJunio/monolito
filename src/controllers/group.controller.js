const express = require('express');
const router = express.Router();

const { createGroup } = require('../models/group');

const auth = require('../middleware/auth');

router.post('/',  auth, async (req, res, next) => {
    try {
        const result = await createGroup(req.body)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router;