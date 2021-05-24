require('dotenv').config()
module.exports = {

  config: {

    server: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,

    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
      idleTimeoutMillis: 300000,
      max: 100
    },

    options: {
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    }
  },

  // email: nodemailer.createTransport({
  //   host: process.env.EMAILHOST,
  //   port: process.env.EMAILPORT,
  //   auth: {
  //     user: process.env.EMAILUSER,
  //     pass: process.env.EMAILPASS
  //   },
  //   secureConnection: false,
  //   tls: { ciphers: 'SSLv3' }
  // }),

  twilioconfig: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN
  }


}
