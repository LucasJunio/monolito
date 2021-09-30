const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { readShopkeepers, readShopkeeperid, updateShopkeeperid } = require("../models/shopkeepers");

router.get("/:id", auth, async (req, res, next) => {
    try {
        const result = await readShopkeeperid(req.params.id);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

router.put("/", auth, async (req, res, next) => {
    try {
        const result = await updateShopkeeperid(req.body);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

router.get("/", auth, async (req, res, next) => {
    try {
        const result = await readShopkeepers(req.query);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});


module.exports = router;
