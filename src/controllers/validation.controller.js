const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = require("../middleware/auth");

const {
  validateEmail,
  validateSms,
  sendSms,
  returnStatusValidation,
  emailInvitation,
} = require("../models/validation");

logger.debug("Rota /validation");
router.get("/email/:token", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Validation']
       #swagger.description = 'Endpoint to edit validation email by token' */

    /*	#swagger.parameters['token'] = {
          in: 'query',
          description: 'Edit validation email by token',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Edição de validação por email`);
    const result = await validateEmail(req.params.token);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/sms/:token", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Validation']
       #swagger.description = 'Endpoint to edit validation sms by token' */

    /*	#swagger.parameters['token'] = {
          in: 'query',
          description: 'Edit validation sms by token',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Edição de validação de sms por token`);
    const result = await validateSms(
      req.params.token,
      req.headers.authorization
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/status", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Validation']
       #swagger.description = 'Endpoint get status shopkeeper' */

    /*	#swagger.parameters['token'] = {
          in: 'query',
          description: 'Get status shopkeeper',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Busca lista de status`);
    const result = await returnStatusValidation(req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/resendsms", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Validation']
       #swagger.description = 'Endpoint resendsms shopkeeper' */

    /*	#swagger.parameters['token'] = {
          in: 'query',
          description: 'Resend sms shopkeeper',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Reenvia sms shopkeeper`);
    const result = await sendSms(req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/emailinvitation", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['Validation']
       #swagger.description = 'Endpoint to valadate a email invitation' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Valadate email invitation',
          required: true,
          schema: { $ref: "#/definitions/EmailInvatation" }
  } */
    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Validação de email`);
    logger.info(JSON.stringify(req.body));
    const result = await emailInvitation(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
