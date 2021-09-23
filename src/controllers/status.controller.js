const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { getStatus } = require("../models/status");

router.get("/:type", auth, async (req, res, next) => {
  try {
    const result = await getStatus(req.params);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
