const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const getCurrentUser = require("../helpers/getCurrentUser");
const {
  readShopkeepers,
  readShopkeeperid,
  updateShopkeeperid,
  readShopkeeperGUUID,
} = require("../models/shopkeepers");

logger.debug("Rota /shopkeepers");
router.get("/:id", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Shopkeepers']
       #swagger.description = 'Endpoint to get list of shopkeepers by id' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const { email } = getCurrentUser(req.headers.authorization);
    logger.info(`Chamada do usuário ${email}`);
    const result = await readShopkeeperid(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Shopkeepers']
       #swagger.description = 'Endpoint to edit shopkeeper' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Edit a shopkeeper',
          required: true,
          schema: { $ref: "#/definitions/ShopkeepersEdit" }
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const { email } = getCurrentUser(req.headers.authorization);
    logger.info(`Chamada do usuário ${email}`);
    logger.infog(req.body);
    const result = await updateShopkeeperid(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Shopkeepers']
       #swagger.description = 'Endpoint to get list of shopkeepers' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const { email } = getCurrentUser(req.headers.authorization);
    logger.info(`Chamada do usuário ${email}`);
    const result = await readShopkeepers(req.query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/guuid/:guuid", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Shopkeepers']
       #swagger.description = 'Endpoint to get shopkeeper by guuid' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const { email } = getCurrentUser(req.headers.authorization);
    logger.info(`Chamada do usuário ${email}`);
    logger.info(`Lojista por guuid: ${req.params.guuid}`);
    const result = await readShopkeeperGUUID(req.params.guuid);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
