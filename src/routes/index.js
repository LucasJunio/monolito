const router = require("express").Router();

router.use("/signup", require("../controllers/signup.controller"));
router.use("/signin", require("../controllers/signin.controller"));
router.use("/validation", require("../controllers/validation.controller"));
router.use("/person", require("../controllers/person.controller"));
router.use("/group", require("../controllers/group.controller"));
router.use("/user", require("../controllers/user.controller"));
router.use("/status", require("../controllers/status.controller"));

module.exports = router;
