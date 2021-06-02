const router = require('express').Router();

router.post('/', async (req, res) => {

    console.log("Hello World")

    res.status(201).json({ message: "success" });

})


module.exports = router;