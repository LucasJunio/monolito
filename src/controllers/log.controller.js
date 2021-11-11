const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { changeLogLevel } = require("../models/log");

logger.debug("Rota /log");
router.post("/", auth, async (req, res, next) => {
  try {
    const result = await changeLogLevel(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
