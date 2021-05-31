require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');
const userValidation = require("../validate/user.validation");

function create(user, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
        } else {
            let request = new sql.Request();
            userValidation(user, async (err, result) => {
                if (result) {

                    await bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.senha, salt, function (err, hash) {
                            let querysql = `INSERT INTO USUARIOS
                                    (DATA, NOME, EMAIL, CELULAR, SENHA, TOKEN1, TOKEN2) 
                                    VALUES (GETDATE(), '${user.nome}', '${user.email}', ${user.celular},
                                    '${hash}', '${user.token1}', '${user.token2}')`

                            request.query(querysql, (err, recordset) => {
                                if (err) {
                                    callback(err, false)
                                };
                                sql.close();
                                callback(null, true)
                            });
                        })
                    });
                } else {
                    callback(err, false)
                }
            })
        }
    });
}

function read(user, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
        } else {
            let request = new sql.Request();

            await request.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${user.email}'`, async function (err, recordset) {
                try {
                    if (recordset.length == 0) {
                        callback('user invalid', false)
                    } else {                                                
                        if (await bcrypt.compare(user.senha, recordset[0].senha)) {
                            
                            const token = await jwt.sign({ id: recordset[0].id }, process.env.JWT_SECRET, {
                                expiresIn: 86400,
                            })

                            callback(null, {token, success: true})
                        } else {
                            callback('user or password incorrect', false)
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

module.exports = { create, read }