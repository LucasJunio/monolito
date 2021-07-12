require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/settings');

function sigin(payload, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            await request.query(`select * from usuario where email ='${payload.email}'`, async function (err, recordset) {
                try {
                    if (recordset.length == 0) {
                        callback('email invalid', false)
                        return;
                    } else {
                        if (await bcrypt.compare(payload.senha, recordset[0].senha)) {
                            
                            const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
                                expiresIn: 86400,
                            })
                        
                            return callback(null, { token, success: true })
                        
                        } else {                            
                            callback('password incorrect', false)
                            return;
                        }
                    }
                }
                catch (err) {
                    console.error(err)
                    sql.close();
                    return;
                }
            });
        }
    });
}

module.exports = { sigin }