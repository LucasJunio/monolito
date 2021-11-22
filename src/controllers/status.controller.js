const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getStatus } = require("../models/status");

logger.debug("Rota /status");
router.get("/:type", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Status']
       #swagger.description = 'Endpoint to get shopkeeper by guuid' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug(`Busca por status do tipo: ${req.params.type}`);
    logger.info(JSON.stringify(req.body));
    const result = await getStatus(req.params);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
