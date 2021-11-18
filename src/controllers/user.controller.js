const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  createUserAdmin,
  readUserAdmin,
  putUserAdmin,
  delUserAdmin,
  readUserAdminID,
  finishRegister,
  getUserValidation,
} = require("../models/user");

logger.debug("Rota /user");
router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['User']
       #swagger.description = 'Get list of User adm' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Busca a lista de usuário adm`);
    const result = await readUserAdmin();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to get user adm by id' */

    /*	#swagger.parameters['id'] = {
          in: 'query',
          description: 'id user',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Busca do usuário com id: ${req.params.id}`);
    const result = await readUserAdminID(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to edit a user' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Edit user by id.',
          required: true,
          schema: { $ref: "#/definitions/EditUserAdm" }
  } */
    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Edição do usuário com id: ${req.params.id}`);
    logger.info(req.body);
    const result = await putUserAdmin(req.body, req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to edit create a user admin' */

    /*	#swagger.parameters['id'] = {
          in: 'query',
          description: 'id user',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const result = await delUserAdmin(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/user-admin", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to edit create a user admin' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Create a new user admin',
          required: true,
          schema: { $ref: "#/definitions/CreateUserAdm" }
  } */
    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Criando novo usuário admin`);
    logger.info(req.body);
    const result = await createUserAdmin(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/finishregister", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to edit create a user admin' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Create a new user admin',
          required: true,
          schema: { $ref: "#/definitions/FinisheRegister" }
  } */
    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Termino do cadastro do usuário`);
    logger.info(req.body);
    const result = await finishRegister(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/getuservalidation/:email", async (req, res, next) => {
  try {
    /* 	#swagger.tags = ['User']
       #swagger.description = 'Endpoint to verify if user is validate' */

    /*	#swagger.parameters['email'] = {
          in: 'query',
          description: 'Verify if user is validate',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Iniciando validação do usuário por email: ${email}`);
    const result = await getUserValidation(req.params);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
