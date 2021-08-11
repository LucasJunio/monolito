require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

const { postGroupSchema } = require('../validate/group.validation');

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

                    return resolve({ name: 'success' })
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

module.exports = { createGroup, readGroup }