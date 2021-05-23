const sql = require("mssql");
const { config } = require('../config/settings');

const userValidation = require("../models/user.validation");

function create(user, callback) {
    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
        } else {
            userValidation(user, (err, result) => {
                if (result) {
                    let querysql = `INSERT INTO user
                              (DATA,CODIGO,IDESPECIAL,ID_PROSITE,MESEOCORRE,MESIOCORRE,
                              TIPOCANC,NOMESEG,CPF,PARCELAS,BLOQUEIO,STATUS,OBSERVACAO) 
                            VALUES (GETDATE(), ${item.CODIGO}, '${item.IDESPECIAL}', ${item.ID_PROSITE}, 
                            '${item.MESEOCORRE}', '${item.MESIOCORRE}', ${item.TIPOCANC}, '${item.NOMESEG}',
                            '${item.CPF}', '${item.PARCELAS}','${item.BLOQUEIO}','${item.STATUS}','${item.OBSERVACAO}')`

                    let request = new sql.Request();

                    await request.query(querysql, (err, recordset) => {
                        if (err) {
                            console.log("Erro de inserção do banco" + err)
                            callback(null, false)
                        };

                        sql.close();
                        callback(null, true)
                    });
                } else {
                    callback(err, false)
                }
            })
        }
    });
}

function read(user, callback) {
    sql.connect(config, function (err) {
        if (err) {
            callback(err, false)
        } else {
            let querysql = `SELECT * FROM USER WHERE EMAIL =${user.EMAIL}`

            let request = new sql.Request();

            let result = await request.query(querysql, (err, recordset) => {
                if (err) {
                    console.log("Erro de inserção do banco" + err)
                    callback(null, false)
                };

            });

            sql.close();
            callback(result, true)
        }
    });
}

module.exports = { create, read }