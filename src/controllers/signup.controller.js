const express = require('express');
const router = express.Router();

const { createUser } = require('../models/user');
const { sigin } = require('../models/sigin');
const { sendEmail, sendSms } = require('../models/validation');

// Signup user
router.post('/', async (req, res) => {
    
    await createUser(req.body, (err, result) => {
        if (!result) {
            res.status(400).send({ message: err });
            return;
        } else {            

            sigin(req.body, (err, result) => {
                if (!result.success) {
                    res.status(400).send({ message: err });
                    return;
                } else {
                    
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