const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const { createUserAdmin, readUserAdmin, putUserAdmin, delUserAdmin } = require('../models/user');

router.get('/',  auth, async (req, res, next) => {
    try {
        const result = await readUserAdmin()
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.put('/:id',  auth, async (req, res, next) => {
    try {
        const result = await putUserAdmin(req.body, req.params.id)
        res.status(200).send(result)
    } catch (error) {
        next(error)
    }
})

router.delete('/',  auth, async (req, res, next) => {
    try {
        const result = await delUserAdmin(req.headers.authorization)
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