require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/settings');
const { validateSignin, signinSchema } = require('../validate/signin.validation');

async function signin(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await signinSchema.validate(payload)

                if (error) return reject({ name: 'error', message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                request.query(`select * from usuario where email ='${payload.email}'`, async function (err, recordset) {

                    sql.close();

                    if (err || recordset.length == 0) return reject({ name: 'error',  message: 'Email incorreto.', details: 'Syntax error: ' + err.message })

                    if (await bcrypt.compare(payload.senha, recordset[0].senha)) {

                        const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
                            expiresIn: 86400,
                        })

                        return resolve({ name: 'success', message: 'Usuário logado.', token })

                    } else { return reject({ name:'error', message:'Senha incorreta.' }) }
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function signinAdmin(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error',message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await signinSchema.validate(payload)

                if (error) return reject({ name: 'success',message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                request.query(`select * from usuario_admin where email ='${payload.email}'`, async function (err, recordset) {

                    sql.close();

                    if (err || recordset.length == 0) return reject({ name: 'error', message: 'Email incorreto.', details:  'Syntax error: ' + err })

                    if (await bcrypt.compare(payload.senha, recordset[0].senha)) {

                        const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
                            expiresIn: 86400,
                        })

                        return resolve({ name: 'success', message: 'Usuário logado.', token })

                    } else { return reject({ name: 'error', message: 'Senha incorreta.' }) }
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

module.exports = { signin, signinAdmin }