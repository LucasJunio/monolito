const express = require('express');
const router = express.Router();

const { create, read, sendEmail, sendSms } = require('../models/user');

// Signup user
router.post('/', async (req, res) => {
    
    console.log(req.body)

    await create(req.body, (err, result) => {
        if (!result) {
            res.status(400).send({ message: err });
            return;
        } else {

            res.status(201).send({ message: "success" });

            // read(req.body, (err, result) => {
            //     if (!result.success) {
            //         return res.status(400).send({ message: err });
            //     } else {
                    
            //         req.body.id = result.id

            //         sendEmail(req.body, (err, result) => {
            //             if (!result.success) {
            //                 return res.status(400).send({ message: err });
            //             } else {
            //                 sendSms(req.body, (err, result) => {
            //                     if (!result.success) {
            //                         return res.status(400).send({ message: err });
            //                     } else {
            //                         res.status(201).send({ message: "success", token: result.token });
            //                     }
            //                 })
            //             }
            //         })  
            //     }
            // })
        }
    })
})

module.exports = router;