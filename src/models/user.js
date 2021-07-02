require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');
const userValidation = require("../validate/user.validation");

function createUser(payload, callback) {

    console.log(payload.usuario.nome)

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();
            userValidation(payload, async (err, result) => {
                if (result) {         
                    
                    console.log("teste"+payload.usuario.nome)
                    
                    await bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(payload.usuario.senha, salt, function (err, hash) {

                            let querysql = `insert into usuario
                                    (data, nome, email, celular, senha, token_sms, validacao) 
                                    values (GETDATE(), '${payload.usuario.nome}', '${payload.usuario.email}', '${payload.usuario.celular}',
                                    '${hash}', '${generateOTP()}', 0)`

                            request.query(querysql, (err, recordset) => {
                                if (err) {
                                    callback(err, false)
                                    return;
                                };

                                sql.close();
                                return callback(null, true)
                            });
                        })
                    });

                } else {
                    callback(err, false)
                    return;
                }
            })
        }
    });
}

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = { createUser }