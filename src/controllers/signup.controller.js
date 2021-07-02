const express = require('express');
const router = express.Router();

const { createUser } = require('../models/user');
const { sigin } = require('../models/sigin');
const { sendEmail, sendSms } = require('../models/validation');
const { createPerson } = require('../models/person');
const { createAddreess } = require('../models/address');
const { createEnterprise } = require('../models/enterprise');
const { createAccount } = require('../models/account');

// Signup user
router.post('/', async (req, res) => {

    const { usuario, pessoa, empresa, conta, endereco_cnpj, endereco_cpf } = req.body
    
    await createUser(usuario, (err, result) => {
        if (!result) {
            res.status(400).send({ message: err });
            return;
        } else {

            sigin(usuario, (err, result) => {
                if (!result.success) {
                    res.status(400).send({ message: err });
                    return;
                } else {

                    createPerson({ usuario, pessoa }, (err, result) => {
                        if (!result.success) {
                            res.status(400).send({ message: err });
                            return;
                        } else {       
                            
                            let querysql = `insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                            values ('${result.id}', '${endereco_cpf.cep}', '${endereco_cpf.complemento}',
                            '${endereco_cpf.endereco}', '${endereco_cpf.numero}', '${endereco_cpf.bairro}')`

                            createAddreess(querysql, (err, result) => {
                                if (!result.success) {
                                    res.status(400).send({ message: err });
                                    return;
                                } else {

                                    createEnterprise({usuario, empresa}, (err, result) => {
                                        if (!result.success) {
                                            res.status(400).send({ message: err });
                                            return;
                                        } else {                                            

                                            let querysql = `insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                                            values ('${result.id}', '${endereco_cnpj.cep}', '${endereco_cnpj.complemento}',
                                            '${endereco_cnpj.endereco}', '${endereco_cnpj.numero}', '${endereco_cnpj.bairro}')`

                                            createAddreess(querysql, (err, result) => {
                                                if (!result.success) {
                                                    res.status(400).send({ message: err });
                                                    return;
                                                } else {

                                                    createAccount(conta, (err, result) => {
                                                        if (!result.success) {
                                                            res.status(400).send({ message: err });
                                                            return;
                                                        } else {

                                                            sendEmail(usuario, (err, result) => {
                                                                if (!result.success) {
                                                                    res.status(400).send({ message: err });
                                                                    returnGE;
                                                                } else {
                                                                    sendSms(usuario, (err, result) => {
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