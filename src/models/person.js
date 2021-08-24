require('dotenv').config()
const sql = require("mssql");
const jwt = require('jsonwebtoken');
const { config } = require('../config/settings');

const { putCellphoneSchema } = require('../validate/person.validation');

async function updateCellphone(payload, authHeader) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'error', message: 'Conexão com o banco de dados falhou.', details: err })

                const { error } = await putCellphoneSchema.validate(payload)

                if (error) return reject({ name: 'error', message: 'Falha na validação dos dados.', details: error.details[0].message })

                let request = new sql.Request();

                const parts = authHeader.split(' ');
                const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

                request.query(`update pessoa 
                                set celular ='${payload.celular}'
                                from 
                                pessoa p
                                join usuario u on u.id = p.id_usuario 
                                where u.email ='${decoded.email}'
                                select @@ROWCOUNT as rowsAffected`, async (err, recordset) => {

                    await sql.close();

                    if (err) return reject({ name: 'error', message: 'Registro não encontrado.', details: err })

                    return resolve({ name: 'success', message: 'Celular atualizado.' })
                });
            });
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = { updateCellphone }