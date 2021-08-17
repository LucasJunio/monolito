require('dotenv').config()
const sql = require("mssql");
const jwt = require("jsonwebtoken");

const { config } = require('../config/settings');

const { postGroupSchema, relationshipUserGroupSchema } = require('../validate/group.validation');

async function createGroup(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await postGroupSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                let request = new sql.Request();

                request.query(`insert into grupo (nome) values ('${payload.nome}')`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'Grupo não cadastrado.', message: err })

                    return resolve({ name: 'success', message: 'Grupo cadastrado.' })
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function readGroup() {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                let request = new sql.Request();

                request.query(`select * from grupo`, async (err, recordset) => {

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

async function relationshipUserGroup(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await relationshipUserGroupSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                let request = new sql.Request();

                request.query(`insert into usu_admin_grupo (fk_id_usu_adm, fk_id_grupo) values (${payload.fk_id_usu_adm}, ${payload.fk_id_grupo})`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'Relacionamento grupo e usuário não cadastrada.', message: err })

                    return resolve({ name: 'success' })
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function returnRelationshipUserGroup(token) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                let request = new sql.Request();

                // const parts = token.split(" ");
                // const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

                request.query(`
                        SELECT gp.nome
                        FROM grupo gp
                        INNER JOIN usu_admin_grupo uag 
                            ON gp.id = uag.fk_id_grupo 
                        INNER JOIN usuario_admin ua
                            ON ua.id = uag.fk_id_usu_adm    
                        WHERE ua.id = 1`, async (err, recordset) => {

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

module.exports = { createGroup, readGroup, relationshipUserGroup, returnRelationshipUserGroup }