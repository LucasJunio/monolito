const express = require('express');
const router = express.Router();

const { create, read, sendEmail, sendSms } = require('../models/user');

// Signup user
router.post('/', async (req, res) => {
    
    await create(req.body, (err, result) => {
        if (!result) {
            res.status(400).send({ message: err });
            return;
        } else {

            read(req.body, (err, result) => {
                if (!result.success) {
                    res.status(400).send({ message: err });
                    return;
                } else {
                    
                    req.body.id = result.id

                    sendEmail(req.body, (err, result) => {
                        if (!result.success) {
                            res.status(400).send({ message: err });
                            return;
                        } else {
                            sendSms(req.body, (err, result) => {
                                if (!result.success) {
                                    res.status(400).send({ message: err });
                                    return;
                                } else {
                                    res.status(201).send({ message: "success", token: result.token });
                                }
                            })
                        }
                    })  
                }
            })
        }
    })
})

module.exports = router;