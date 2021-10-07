require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

async function readDocuments(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
                req.query(`select * from documentos where id_usuario = ${id}`, async (err, recordset) => {
                    if (err) reject({ name: "error", message: err });
                    !!recordset[0] ? resolve({ name: "success", message: recordset }) : resolve({ name: "success", message: 'Não há arquivos para este usuário!' });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readDocuments
};

