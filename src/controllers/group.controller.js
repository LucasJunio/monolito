const express = require('express');
const router = express.Router();

const { createGroup, readGroup, relationshipUserGroup } = require('../models/group');

const auth = require('../middleware/auth');

router.post('/',  auth, async (req, res, next) => {
    try {
        const result = await createGroup(req.body)
        res.status(201).send(result)
    } catch (error) {
        next(error)
    }
})

router.get('/',  auth, async (req, res, next) => {
    try {
        const result = await readGroup()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.post('/user-group',  auth, async (req, res, next) => {
    try {
        const result = await relationshipUserGroup(req.body)
        res.status(201).send(result)
    } catch (error) {
        next(error)
    }
})


module.exports = router;