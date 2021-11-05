require("dotenv").config();
const nodemailer = require("nodemailer");
const twilio = require("twilio");

module.exports = {
  config: {
    server: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      idleTimeoutMillis: 300000,
      max: 100,
    },

    options: {
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
    },
  },

  config2: {
    server: process.env.DB_HOST2,
    user: process.env.DB_USERNAME2,
    password: process.env.DB_PASSWORD2,

    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      idleTimeoutMillis: 300000,
      max: 100,
    },

    options: {
      port: process.env.DB_PORT2,
      database: process.env.DB_NAME2,
    },
  },

  email: nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS,
    },
    secureConnection: false,
    tls: { ciphers: "SSLv3" },
  }),

  twilioconfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
  },
};
