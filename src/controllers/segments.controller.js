const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { readSegments } = require("../models/segments");

logger.debug("Rota /segments");
router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Segments']
       #swagger.description = 'Endpoint to get a list of segments' */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    const result = await readSegments();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
