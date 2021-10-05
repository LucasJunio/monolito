const express = require("express");
const router = express.Router();
const upload = require("../upload")
const auth = require("../middleware/auth");
const { readShopkeepers, readShopkeeperid, updateShopkeeperid, uploadDocuments } = require("../models/shopkeepers");

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

router.post("/upload", upload.array('file', 3), async (req, res, next) => {
    try {
        if (req.files) {
            const result = await uploadDocuments(req);
            res.send({ status: "success" });
        } else {
            throw Error("FILE_MISSING");
        }
    } catch (error) {
        next(error);
    }
});


module.exports = router;
