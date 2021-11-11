const express = require("express");
const { loggers } = require("winston");
const router = express.Router();

const auth = require("../middleware/auth");
const { readDashboard } = require("../models/dashboard");

logger.debug("Rota /dashboard");
router.get("/", auth, async (req, res, next) => {
  try {
    const result = await readDashboard(req.query, req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
