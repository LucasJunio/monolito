require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config, twilioconfig, email } = require('../config/settings');
const userValidation = require("../validate/user.validation");
const twilio = require('twilio')(twilioconfig.accountSid, twilioconfig.authToken);

function create(user, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();
            userValidation(user, async (err, result) => {
                if (result) {

                    token1 = generateOTP()
                    token2 = generateOTP()

                    await bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(user.senha, salt, function (err, hash) {
                            let querysql = `INSERT INTO USUARIOS
                                    (DATA, NOME, EMAIL, CELULAR, SENHA, TOKEN1, VALIDACAO) 
                                    VALUES (GETDATE(), '${user.nome}', '${user.email}', '${user.celular}',
                                    '${hash}', '${token1}', 0)`

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

function read(user, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            await request.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${user.email}'`, async function (err, recordset) {
                try {
                    if (recordset.length == 0) {
                        callback('email invalid', false)
                        return;
                    } else {
                        const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                            expiresIn: 86400,
                        })
                    
                        return callback(null, { token, success: true })
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

function sigin(user, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            await request.query(`SELECT * FROM USUARIOS WHERE EMAIL ='${user.email}'`, async function (err, recordset) {
                try {
                    if (recordset.length == 0) {
                        callback('user invalid', false)
                        return;
                    } else {
                        if (await bcrypt.compare(user.senha, recordset[0].senha)) {
                            
                            const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
                                expiresIn: 86400,
                            })
                        
                            return callback(null, { token, success: true })
                        } else {
                            callback('user or password incorrect', false)
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

async function sendEmail(user, callback) {

    const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET, {})

    const message = {
        from: 'contato@vilevepay.com.br',
        to: user.email,
        subject: 'Confirmação de Conta Vileve',
        html: `
        Olá ${user.nome}, <br>
        <h2>Seja bem vindo ao gateway de pagamentos vileve.</h2> <br> Clique no link abaixo para confirmar sua conta.
        <br> <a href='http://localhost:3000/validation/email/${token}'>Clique para confirmar sua conta</a> <br>  `
    }

    email.sendMail(message, function (err, info) {
        if (err) { return callback(err, false) } else { return callback(null, { success: true }) }
    });
}

async function sendSms(user, callback) {
    twilio.messages
        .create({
            body: 'Token SMS Gateway Vileve: ' + user.token1,
            from: '+14158549567',
            to: '+55' + user.celular
        })
        .catch(err => { return callback(err, false) })

    const token = await jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 86400,
    })

    return callback(null, { token, success: true })
}

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = { create, read, sendEmail, sendSms, sigin }