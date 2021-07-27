const express = require('express');
const router = express.Router();

const { signupCNPJ, signupCPF } = require('../models/signup');

// Signup CNPJ
router.post('/cnpj', (req, res, next) => {
    signupCNPJ(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => next(err));
})

// Signup CPF
router.post('/cpf', (req, res, next) => {
    signupCPF(req.body)
        .then(result => res.status(201).send(result))
        .catch(err => next(err));
})

module.exports = router;