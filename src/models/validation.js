require('dotenv').config()
const sql = require("mssql");
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');

function email(emailToken, authHeader, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
        } else {
            let request = new sql.Request();
            
            const parts = authHeader.split(' ');
            const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

            await request.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${decoded.email}'`, async function (err, recordset) {
                try {
                    if (recordset.length == 0) {
                        callback('invalid email', false)
                    } else {
                        console.log(recordset[0].token1)

                        if (recordset[0].token2 == emailToken) {
                            callback(null, { success: true })
                        } else {
                            callback('email into jwt invalid', false)
                        }
                    }
                }
                catch (err) {
                    console.error(err)
                    sql.close();
                }
            });
        }
    });
}

module.exports = { email }