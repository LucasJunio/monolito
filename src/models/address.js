require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createAddreess(payload, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            let querysql = `insert into endereco (id, cep, complemento, endereco, bairro) 
                            values ('${payload.id}', '${payload.cep}', '${payload.complemento}',
                            '${payload.endereco}', '${payload.bairro}')`

            request.query(querysql, (err, recordset) => {
                if (err) {
                    callback(err, false)
                    return;
                };

                sql.close();
                return callback(null, true)
            });
        }
    });
}

module.exports = { createAddreess }