const express = require("express");
const router = express.Router();

const { signin, signinAdmin } = require("../models/signin");

logger.debug("Rota /signin");
// Signin user
router.post("/", async (req, res, next) => {
  try {
    /* #swagger.tags = ['Signin']
       #swagger.description = 'Endpoint to login' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Signin route',
          required: true,
          schema: { $ref: "#/definitions/Signin" }
  } */

    logger.debug("Logando com usuário");
    logger.info(JSON.stringify(req.body));
    const result = await signin(req.body);
    logger.debug("Usuário lojista logado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/admin", async (req, res, next) => {
  try {
    /* #swagger.tags = ['Signin']
       #swagger.description = 'Endpoint to login Adm' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Signin route',
          required: true,
          schema: { $ref: "#/definitions/SigninAdm" }
  } */
    logger.debug("Logando com usuário");
    logger.info(JSON.stringify(req.body));
    const result = await signinAdmin(req.body);
    logger.debug("Usuário Administrador logado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
