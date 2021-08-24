require('dotenv').config()
const sql = require("mssql");
const jwt = require("jsonwebtoken");

const { config } = require('../config/settings');

const { postGroupSchema, ArrayRelationshipUserGroup } = require('../validate/group.validation');

async function createGroup(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await postGroupSchema.validate(payload)

                if (error) return reject({ name: 'error', message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                request.query(`insert into grupo (nome) values ('${payload.nome}')`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'error', message: 'Grupo não cadastrado.', details: err })

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

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                let request = new sql.Request();

                request.query(`select * from grupo`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'error', message: 'Leitura não efetuada', details: err })

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

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await ArrayRelationshipUserGroup.validate(payload)

                if (error) return reject({ name: 'error', message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                for (const key in payload) {
                    request.query(`insert into usu_admin_grupo (fk_id_usu_adm, fk_id_grupo) values (${payload[key].fk_id_usu_adm}, ${payload[key].fk_id_grupo})`, async (err, recordset) => {
                        if (err) return reject({ name: 'error', message: 'Relacionamento grupo e usuário não cadastrado.', details: { grupo: payload[key].fk_id_grupo, err } })
                    });
                }

                await sql.close();

                return resolve({ name: 'success' })
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function putRelationshipUserGroup(payload, id) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await ArrayRelationshipUserGroup.validate(payload)

                if (error) return reject({ name: 'error', message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                request.query(`delete 
                                from usu_admin_grupo
                                where fk_id_usu_adm ='${id}'
                                select @@ROWCOUNT as rowsAffected`, async (err, recordset) => {
                    if (err) return reject({ name: 'error', message: 'Exclusão de relacionamentos usuário e grupo não efetuada.', details: err })
                });

                for (const key in payload) {
                    request.query(`insert into usu_admin_grupo (fk_id_usu_adm, fk_id_grupo) values (${payload[key].fk_id_usu_adm}, ${payload[key].fk_id_grupo})`, async (err, recordset) => {
                        if (err) return reject({ name: 'error', message: 'Relacionamento grupo e usuário não cadastrado.', details: { grupo: payload[key].fk_id_grupo, err } })
                    });
                }

                await sql.close();

                return resolve({ name: 'success', message: 'Relacionamento usuário grupo atualizado' })
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

async function returnRelationshipUserGroup(id) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                let request = new sql.Request();

                request.query(`
                        SELECT gp.nome, gp.id
                        FROM grupo gp
                        INNER JOIN usu_admin_grupo uag 
                            ON gp.id = uag.fk_id_grupo 
                        INNER JOIN usuario_admin ua
                            ON ua.id = uag.fk_id_usu_adm    
                        WHERE ua.id = ${id}`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'error', message: 'Retorno não efetuada', details: err })

                    return resolve({ name: 'success', message: recordset })
                });
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}

module.exports = { createGroup, readGroup, 
    relationshipUserGroup, returnRelationshipUserGroup,
    putRelationshipUserGroup
}