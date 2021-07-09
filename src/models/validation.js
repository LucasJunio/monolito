require('dotenv').config()
const sql = require("mssql");
const jwt = require('jsonwebtoken');

const { config, twilioconfig, email } = require('../config/settings');
const twilio = require('twilio')(twilioconfig.accountSid, twilioconfig.authToken);

async function sendEmail(payload) {

    return new Promise(async function (resolve, reject) {

        const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {})

        const message = {
            from: 'contato@vilevepay.com.br',
            to: payload.email,
            subject: 'Confirmação de Conta Vileve',
            html: `
            Olá ${payload.nome}, <br>
            <h2>Seja bem vindo ao gateway de pagamentos vileve.</h2> <br> Clique no link abaixo para confirmar sua conta.
            <br> <a href='http://localhost:3000/validation/email/${token}'>Clique para confirmar sua conta</a> <br>  `
        }

        email.sendMail(message, function (err, info) {
            if (err) reject({ name: 'E-mail não enviado.', message: err })
            resolve()
        });
    })
}

async function sendSms(payload) {

    return new Promise(async function (resolve, reject) {

        sql.connect(config, async function (err) {

            if (err) reject({ name: 'Conexão com o banco de dados falhou.', message: err })

            let request = new sql.Request();

            await request.query(`select u.token_sms token_sms from usuario u join pessoa p on p.id_usuario = u.id where p.cpf ='${payload.cpf}'`, async function (err, recordset) {

                sql.close();

                if (err) reject({ name: 'E-mail do usuário não encontrado.', message: err })

                const mobilenumber = payload.celular.toString().replace(/[() -]/g, '')

                twilio.messages
                    .create({
                        body: 'Vileve Way - Token: ' + recordset[0].token_sms,
                        from: '+14158549567',
                        to: `+55${mobilenumber}`
                    })
                    .catch(err => reject({ name: 'E-mail do usuário não encontrado.', message: err }))

                resolve()
            });
        });
    });
}

function validateEmail(token, callback) {

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

function validateSms(token, authHeader, callback) {

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

module.exports = { sendEmail, sendSms, validateEmail, validateSms }