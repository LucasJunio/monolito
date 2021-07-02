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
                            values ('${payload.conta.id}', '${payload.conta.banco}', '${payload.conta.agencia}', 
                            '${payload.conta.conta}', '${payload.conta.operacao}', '${payload.conta.pix}')`

            request.query(querysql, (err, recordset) => {
                if (err) {
                    callback(err, false)
                    return;
                };

                sql.close();
                return callback(null, { id: payload.cpf, success:true })
            });
        }
    });
}

module.exports = { createAccount }