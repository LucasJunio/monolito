require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createAccount(payload, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            let querysql = `insert into conta (id, banco, agencia, conta, operacao, pix) 
                            values ('${payload.id}', '${payload.banco}', '${payload.agencia}', 
                            '${payload.conta}', '${payload.operacao}', '${payload.pix}')`

            request.query(querysql, (err, recordset) => {
                if (err) {
                    callback(err, false)
                    return;
                };

                sql.close();
                return callback(null, { success: true })
            });
        }
    });
}

module.exports = { createAccount }