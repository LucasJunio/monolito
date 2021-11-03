const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { readDocuments, updateStatusDocuments } = require("../models/documents");

router.get("/:id", auth, async (req, res, next) => {
  try {
    const result2 = await readDocuments(req.params.id);
    res.status(200).send(result);
  } catch (error) {
    logger.error(error);
    console.log("readDocuments############");
    next(error);
  }
});

router.put("/", auth, async (req, res, next) => {
  try {
    const result = await updateStatusDocuments(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
