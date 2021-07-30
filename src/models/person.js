require('dotenv').config()
const sql = require("mssql");
const { config } = require('../config/settings');

const { cellphoneSchema } = require('../validate/person.validation');

async function updateCellphone(payload) {

    return new Promise(async function (resolve, reject) {

        sql.connect(config, async function (err) {

            if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

            cellphoneSchema(payload)
                .then(result => {

                    let request = new sql.Request();

                    await request.query(`update ='${payload.celular}'`, async function (err, recordset) {

                        sql.close();

                        if (err) return reject({ name: 'Token SMS não encontrado.', message: err })

                        return resolve()
                    });

                })
                .catch(err => reject(err));
        });
    });
}

module.exports = { updateCellphone }