require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

async function readDashboard() {
    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
                req.query(`select cnae, descricao from seguimentos`, async (err, recordset) => {
                    if (err) reject({ name: "error", message: err });
                    resolve({ name: "success", message: recordset });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readDashboard
};

