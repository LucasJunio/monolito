const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { listByType } = require("../models/lists");

logger.debug("Rota /lists");
router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['List']
       #swagger.description = 'Endpoint get a list' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const result = await listByType(req.query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
