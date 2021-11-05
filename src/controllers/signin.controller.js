const express = require("express");
const router = express.Router();

const { signin, signinAdmin } = require("../models/signin");

// Signin user
router.post("/", async (req, res, next) => {
  try {
    const result = await signin(req.body);
    logger.debug("Usuário lojista logado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post("/admin", async (req, res, next) => {
  try {
    const result = await signinAdmin(req.body);
    logger.info("Usuário Administrador logado info");
    logger.debug("Usuário Administrador logado");
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
