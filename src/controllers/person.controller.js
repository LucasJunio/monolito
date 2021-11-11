const express = require("express");
const router = express.Router();

const { updateCellphone } = require("../models/person");

const auth = require("../middleware/auth");

logger.debug("Rota /person");
router.put("/cellphone", auth, async (req, res, next) => {
  try {
    const result = await updateCellphone(req.body, req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
