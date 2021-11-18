const express = require("express");
const router = express.Router();

const { signupCNPJ, signupCPF } = require("../models/signup");

logger.debug("Rota /signup");
// Signup CNPJ
router.post("/cnpj", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Signup']
       #swagger.description = 'Endpoint to signup CNPJ' */

    /*	#swagger.parameters['array'] = {
          in: 'body',
          description: 'Signup to CNPJ information.',
          required: true,
          schema: { $ref: "#/definitions/SignupCnpj" }
  } */

    /* #swagger.security = [{
          "apiKeyAuth": []
  }] */
    logger.debug(`Signup CNPJ`);
    logger.info(req.body);
    const result = await signupCNPJ(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

// Signup CPF
router.post("/cpf", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Signup']
       #swagger.description = 'Endpoint to signup CPF' */

    /*	#swagger.parameters['array'] = {
          in: 'body',
          description: 'Signup to CPF information.',
          required: true,
          schema: { $ref: "#/definitions/SignupCpf" }
  } */
    logger.debug(`Signup CPF`);
    logger.info(req.body);
    const result = await signupCPF(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
