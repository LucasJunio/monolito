require('dotenv').config()
const sql = require("mssql");

const { config } = require('../config/settings');

function createEnterprise(payload, callback) {

    sql.connect(config, async function (err) {
        if (err) {
            callback(err, false)
            return;
        } else {
            let select = new sql.Request();
            let insert = new sql.Request();

            await select.query(`select id from usuario where email ='${payload.usuario.email}'`, async function (err, recordset) {
                if (!err) {
                    if (recordset.length == undefined) {
                        callback('email not found', false)
                    } else {

                        let querysql = `insert into empresa (id_pessoa, cnpj, cnae, razao_social, telefone_fixo, celular, nome_fantasia, site) 
                            values ('${recordset[0].id}', '${payload.empresa.cnpj}', '${payload.empresa.cnae}', '${payload.empresa.razao_social}',
                            '${payload.empresa.telefone_fixo}', '${payload.empresa.celular}', '${payload.empresa.nome_fantasia}', '${payload.empresa.site}')`

                        insert.query(querysql, (err, recordset) => {
                            if (err) {
                                callback(err, false)
                                return;
                            };

                            sql.close();
                            return callback(null, { id: payload.empresa.cnpj, success: true })
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

module.exports = { createEnterprise }