require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/settings');
const { validateSignin, signinSchema } = require('../validate/signin.validation');

async function signin(payload) {

    return new Promise(async function (resolve, reject) {

        sql.connect(config, async function (err) {

            if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

            validateSignin(payload)
                .then(result => {
                    
                    let request = new sql.Request();

                    request.query(`select * from usuario where email ='${payload.email}'`, async function (err, recordset) {

                        sql.close();

                        if (err || recordset.length == 0) return reject({ name: 'Email ou senha incorreta.', message: (err) ? 'Syntax error: ' + err.message : 'Select error: ' + recordset[0].ErrorMessage })

                        if (await bcrypt.compare(payload.senha, recordset[0].senha)) {

                            const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
                                expiresIn: 86400,
                            })

                            return resolve({ message: 'Usuário logado.', token })

                        } else { return reject({ name: 'Email ou senha incorreta.' }) }
                    });
                })
                .catch(err => reject(err));
        });
    })
}

async function signinAdmin(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await signinSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                let request = new sql.Request();

                request.query(`select * from usuario_admin where email ='${payload.email}'`, async function (err, recordset) {

                    sql.close();

                    if (err) return reject({ name: 'Email incorreto.', message:  'Syntax error: ' + err.message })

                    if (await bcrypt.compare(payload.senha, recordset[0].senha)) {

                        const token = await jwt.sign({ email: payload.email }, process.env.JWT_SECRET, {
                            expiresIn: 86400,
                        })

                        return resolve({ message: 'Usuário logado.', token })

                    } else { return reject({ name: 'Senha incorreta.' }) }
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

module.exports = { signin, signinAdmin }