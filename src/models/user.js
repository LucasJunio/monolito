require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { config } = require('../config/settings');

const { userAdminSchema } = require('../validate/user.validation');

async function createUserAdmin(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await userAdminSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                bcrypt.genSalt(10, function (err, salt) {

                    if (err) return reject({ name: 'Falha na genSalt bcrypt.', message: err })

                    bcrypt.hash(payload.senha, salt, function (err, hash) {

                        if (err) return reject({ name: 'Falha no hash da senha via bcrypt.', message: err })

                        let request = new sql.Request();

                        request.query(`insert into usuario_admin (nome, email, senha, cpf, status) 
                                        values ('${payload.nome}', '${payload.email}', 
                                        '${hash}', '${payload.cpf}', '${payload.status}')
                                        select * from usuario_admin where email='${payload.email}'
                                        `, async (err, recordset) => {

                            await sql.close();

                            if (err) return reject({ name: 'Usuário administrativo não cadastrado.', message: err })

                            return resolve({ name: 'success', message: [{ id: recordset[0].id, nome: recordset[0].nome }]})
                        });
                    })
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function readUserAdmin() {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                let request = new sql.Request();

                request.query(`select * from usuario_admin`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'Error', message: err })

                    return resolve({ name: 'success', message: recordset })
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}


async function putUserAdmin(payload, authHeader) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await userAdminSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                let request = new sql.Request();

                const parts = authHeader.split(' ');
                const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

                request.query(`update ua 
                                set email ='${payload.email}', nome ='${payload.nome}', 
                                status ='${payload.status}', cpf ='${payload.cpf}'
                                from 
                                usuario_admin ua
                                where ua.email ='${decoded.email}'
                                select @@ROWCOUNT as rowsAffected`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'Usuário administrativo não atualizado.', message: err })

                    return resolve({ name: 'success' })
                });
            });
        } catch (error) {
            reject(error)
        }
    });
}

async function delUserAdmin(authHeader) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                let request = new sql.Request();

                const parts = authHeader.split(' ');
                const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

                request.query(`delete 
                               from usuario_admin
                               where email ='${decoded.email}'
                               select @@ROWCOUNT as rowsAffected`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'Usuário administrativo não deletado.', message: err })

                    return resolve({ name: 'success' })
                });
            });
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = { createUserAdmin, readUserAdmin, putUserAdmin, delUserAdmin }