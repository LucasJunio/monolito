const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { readSegments } = require("../models/segments");

router.get("/", auth, async (req, res, next) => {
    try {
        const result = await readSegments();
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});
module.exports = router;