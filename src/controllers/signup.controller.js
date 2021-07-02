const express = require('express');
const router = express.Router();

const { createUser } = require('../models/user');
const { sigin } = require('../models/sigin');
const { sendEmail, sendSms } = require('../models/validation');
const { createPerson } = require('../models/person');
const { createAddreess } = require('../models/address');

// Signup user
router.post('/', async (req, res) => {
    
    console.log(req.body.usuario.nome)

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

                    createPerson(req.body, (err, result) => {
                        if (!result.success) {
                            res.status(400).send({ message: err });
                            return;
                        } else {
                            req.body.id = result.id

                            let querysql = `insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                            values ('${payload.endereco_cpf.id}', '${payload.endereco_cpf.cep}', '${payload.endereco_cpf.complemento}',
                            '${payload.endereco_cpf.endereco}', '${payload.endereco_cpf.numero}', '${payload.endereco_cpf.bairro}')`

                            createAddreess(req.body, querysql, (err, result) => {
                                if (!result.success) {
                                    res.status(400).send({ message: err });
                                    return;
                                } else {

                                    createEnterprise(req.body, (err, result) => {
                                        if (!result.success) {
                                            res.status(400).send({ message: err });
                                            return;
                                        } else {
                                            req.body.id = result.id

                                            let querysql = `insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                                            values ('${payload.endereco_cnpj.id}', '${payload.endereco_cnpj.cep}', '${payload.endereco_cnpj.complemento}',
                                            '${payload.endereco_cnpj.endereco}', '${payload.endereco_cnpj.numero}', '${payload.endereco_cnpj.bairro}')`

                                            createAddreess(querysql, (err, result) => {
                                                if (!result.success) {
                                                    res.status(400).send({ message: err });
                                                    return;
                                                } else {

                                                    createAccount(req.body, (err, result) => {
                                                        if (!result.success) {
                                                            res.status(400).send({ message: err });
                                                            return;
                                                        } else {

                                                            sendEmail(req.body, (err, result) => {
                                                                if (!result.success) {
                                                                    res.status(400).send({ message: err });
                                                                    returnGE;
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
                                        }
                                    })
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