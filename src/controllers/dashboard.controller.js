const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { readDashboard } = require("../models/dashboard");

logger.debug("Rota /dashboard");
router.get("/", auth, async (req, res, next) => {
  try {
    /* #swagger.tags = ['Dashboard']
       #swagger.description = 'Endpoint to Dashboard' */

    /*	#swagger.parameters['startdate'] = {
          in: 'query',
          description: 'Initial Date',
          required: true,
  } */

    /*	#swagger.parameters['enddate'] = {
          in: 'query',
          description: 'Finish Date',
          required: true,
  } */

    /* #swagger.security = [{
          "Bearer": []
  }] */
    logger.debug("Buscando dados para dashboard");
    const result = await readDashboard(req.query, req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
