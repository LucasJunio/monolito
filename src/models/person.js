require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createPerson(payload, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            let querysql = `insert into pessoa (cpf, id_usuario) 
                            values ('${payload.cpf}', '${payload.id_usuario}')`

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

module.exports = { createPerson }