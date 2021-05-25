const express = require('express');
const router = express.Router();

const { create, read } = require('../models/user');

// Signup user
router.post('/', async (req, res) => {

    // await create(req.body, (err, result) => {
    //     if (!result) {
    //         res.status(400).json({ message: err });
    //     } 
    // })

    

    // await read(req.body.email, (response, result) => {
    //     if (!result) {
    //         res.status(400).json({ message: response });
    //     } 
    // })
    



    res.status(201).json({ message: "success" });

})


module.exports = router;