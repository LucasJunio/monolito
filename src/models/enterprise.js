require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createEnterprise(payload, callback) {

    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let request = new sql.Request();

            let querysql = `insert into empresa (id_pessoa, cnpj, cnae, razao_social, telefone_fixo, celular, nome_fantasia, site) 
                            values ('${payload.id_pessoa}', '${payload.cnpj}', '${payload.cnae}', '${payload.razao_social}',
                            '${payload.telefone_fixo}', '${payload.celular}', '${payload.nome_fantasia}', '${payload.site}')`

            request.query(querysql, (err, recordset) => {
                if (err) {
                    callback(err, false)
                    return;
                };

                sql.close();
                return callback(null, { id: payload.cnpj, success:true })
            });
        }
    });
}

module.exports = { createEnterprise }