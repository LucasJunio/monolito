const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { changeLogLevel } = require("../models/log");

logger.debug("Rota /log");
router.post("/", auth, async (req, res, next) => {
  /* 	#swagger.tags = ['Log']
       #swagger.description = 'Endpoint to sign in a specific log' */

  /*	#swagger.parameters['array'] = {
          in: 'body',
          description: 'Log information.',
          required: true,
          schema: { $ref: "#/definitions/EditLog" }
  } */

  /* #swagger.security = [{
          "apiKeyAuth": []
  }] */

  try {
    const result = await changeLogLevel(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
