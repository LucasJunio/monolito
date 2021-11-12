const express = require("express");
const router = express.Router();
const getCurrentUser = require("../helpers/getCurrentUser");
const auth = require("../middleware/auth");
const { getCode } = require("../models/embed");

logger.debug("Rota /embed");
router.get("/", auth, async (req, res, next) => {
  try {
    const { email } = getCurrentUser(req.headers.authorization);
    logger.info(`Inicio do get para o usuario ${email}`);
    const result = await getCode();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
