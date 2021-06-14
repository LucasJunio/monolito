require('dotenv').config()
const sql = require("mssql");
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');

function email(token, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
        } else {
            let select = new sql.Request();
            let update = new sql.Request();

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            await select.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${decoded.email}'`, async function (err, recordset) {
                if (!err) {
                    if (recordset.length == 0) {
                        callback('email not found', false)
                    } else {

                        await update.query(`UPDATE usuarios
                                            set validacao = ( case
                                                                when validacao = 0 then 2                
                                                                when validacao = 1 then 3
                                                                when validacao = 2 then 2
                                                                when validacao = 3 then 3
                                                            end)
                                            WHERE email='${decoded.email}' AND validacao is not null`, async function (err, recordset) {

                            if (!err) {
                                callback(null, { success: true })
                            } else {
                                callback('not updated', false)
                                sql.close();
                            }
                        })
                    }
                } else {
                    console.error(err)
                    sql.close();
                }
            });
        }
    });
}

function sms(token, authHeader, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
        } else {
            let select = new sql.Request();
            let update = new sql.Request();
            
            const parts = authHeader.split(' ');
            const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

            await select.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${decoded.email}'`, async function (err, recordset) {
                if (!err) {
                    if (recordset.length == 0) {
                        callback('email not found', false)
                    } else {

                        if (recordset[0].token1 == token) {
                            await update.query(`UPDATE usuarios
                                            set validacao = ( case
                                                                when validacao = 0 then 1                
                                                                when validacao = 1 then 1
                                                                when validacao = 2 then 3
                                                                when validacao = 3 then 3
                                                             end)
                                            WHERE email='${decoded.email}' AND validacao is not null`, async function (err, recordset) {

                                if (!err) {
                                    callback(null, { success: true })
                                } else {
                                    callback('not updated', false)
                                    sql.close();
                                }
                            })
                        } else {
                            callback('invalid token1', false)
                        }
                    }
                } else {
                    console.error(err)
                    sql.close();
                }
            });
        }
    });
}

module.exports = { email, sms }