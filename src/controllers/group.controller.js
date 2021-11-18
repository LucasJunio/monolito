const express = require("express");
const router = express.Router();

const {
  createGroup,
  readGroup,
  relationshipUserGroup,
  returnRelationshipUserGroup,
  putRelationshipUserGroup,
} = require("../models/group");

const auth = require("../middleware/auth");

logger.debug("Rota /group");
router.post("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Group']
       #swagger.description = 'Endpoint to Group' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Create a Group in adm system',
          required: true,
          schema: { $ref: "#/definitions/Group" }
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Criando um grupo`);
    logger.info(req.body);
    const result = await createGroup(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Group']
       #swagger.description = 'Get list of groups' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Lista de grupos`);
    const result = await readGroup();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/user-group", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Group']
       #swagger.description = 'Endpoint to relationship Group' */

    /*	#swagger.parameters['array'] = {
          in: 'body',
          description: 'Create a relationship group with user',
          required: true,
          schema: { $ref: "#/definitions/UserGroup" }
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Criando relação de grupo(s) e usuário`);
    logger.debug(req.body);
    const result = await relationshipUserGroup(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/user-group/:id", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Group']
       #swagger.description = 'Endpoint to edit relationship Group' */

    /*	#swagger.parameters['array'] = {
          in: 'body',
          description: 'Edit a relationship group with user',
          required: true,
          schema: { $ref: "#/definitions/UserGroup" }
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Edição de usuário por id. Id: ${req.params.id}`);
    logger.debug(req.body);
    const result = await putRelationshipUserGroup(req.body, req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/user-group/:id", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Group']
       #swagger.description = 'Endpoint get a list of relationship Group with user' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`List de usuário por id. Id: ${req.params.id}`);
    const result = await returnRelationshipUserGroup(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
