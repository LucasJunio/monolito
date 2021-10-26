const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { listByType } = require("../models/lists");

router.get("/", auth, async (req, res, next) => {
  try {
    const result = await listByType(req.query);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
