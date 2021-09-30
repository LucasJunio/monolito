const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const { readShopkeeperid } = require("../models/shopkeeperid");

router.get("/", auth, async (req, res, next) => {
    try {
        const result = await readShopkeeperid(req.query);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});



module.exports = router;
