const express = require("express");
const router = express.Router();

const { updateCellphone } = require("../models/person");

const auth = require("../middleware/auth");

logger.debug("Rota /person");
router.put("/cellphone", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Person']
       #swagger.description = 'Endpoint to edit edit cellphone of person' */

    /*	#swagger.parameters['json'] = {
          in: 'body',
          description: 'Edit a relationship group with user',
          required: true,
          schema: { $ref: "#/definitions/PersonCellphone" }
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const result = await updateCellphone(req.body, req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
