require('dotenv').config()
const nodemailer = require('nodemailer');
const twilio = require('twilio');

module.exports = {

  config: {

    server: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,

    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      idleTimeoutMillis: 300000,
      max: 100
    },

    options: {
      port: process.env.PORT,
      database: process.env.NAME
    }
  },

  email: nodemailer.createTransport({
    host: process.env.EMAILHOST,
    port: process.env.EMAILPORT,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASS
    },
    secureConnection: false,
    tls: { ciphers: 'SSLv3' }
  }),

  twilioconfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  }
}
