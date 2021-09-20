const router = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = require("../middleware/auth");

const {
  validateEmail,
  validateSms,
  sendSms,
  returnStatusValidation,
  emailInvitation,
} = require("../models/validation");

router.get("/email/:token", async (req, res, next) => {
  try {
    const result = await validateEmail(req.params.token);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/sms/:token", auth, async (req, res, next) => {
  try {
    const result = await validateSms(
      req.params.token,
      req.headers.authorization
    );
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/status", auth, async (req, res, next) => {
  try {
    const result = await returnStatusValidation(req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/resendsms", auth, async (req, res, next) => {
  try {
    const result = await sendSms(req.headers.authorization);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get("/emailinvitation", auth, async (req, res, next) => {
  try {
    const result = await emailInvitation(req.body);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
