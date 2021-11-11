const express = require("express");
const router = express.Router();

const { signupCNPJ, signupCPF } = require("../models/signup");

logger.debug("Rota /signup");
// Signup CNPJ
router.post("/cnpj", async (req, res, next) => {
  try {
    const result = await signupCNPJ(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

// Signup CPF
router.post("/cpf", async (req, res, next) => {
  try {
    const result = await signupCPF(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
