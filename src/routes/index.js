const router = require("express").Router();

router.use("/signup", require("../controllers/signup.controller"));
router.use("/signin", require("../controllers/signin.controller"));
router.use("/validation", require("../controllers/validation.controller"));
router.use("/person", require("../controllers/person.controller"));
router.use("/group", require("../controllers/group.controller"));
router.use("/user", require("../controllers/user.controller"));
router.use("/status", require("../controllers/status.controller"));
router.use("/shopkeepers", require("../controllers/shopkeepers.controller"));
router.use("/segments", require("../controllers/segments.controller"));
router.use("/documents", require("../controllers/documents.controller"));
router.use("/dashboard", require("../controllers/dashboard.controller"));

module.exports = router;
