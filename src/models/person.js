require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createPerson(payload, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let insert = new sql.Request();
            let select = new sql.Request();

            await select.query(`select id from usuario where email ='${payload.usuario.email}'`, async function (err, recordset) {
                if (!err) {
                    if (recordset.length == 0) {
                        callback('email not found', false)
                    } else {
                        let querysql = `insert into pessoa (cpf, id_usuario) 
                            values ('${payload.pessoa.cpf}', '${recordset.id}')`

                        await insert.query(querysql, (err, recordset) => {
                            if (err) {
                                callback(err, false)
                                return;
                            };

                            sql.close();
                            return callback(null, { id: payload.pessoa.cpf, success: true })
                        });
                    }
                } else {
                    console.error(err)
                    sql.close();
                }
            });
        }
    });
}

module.exports = { createPerson }