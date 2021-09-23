const sql = require("mssql");
const { config } = require("../config/settings");
const { resolve } = require("mssql/lib/connectionstring");
const { reject } = require("bcrypt/promises");
function getStatus({ type }) {
  return new Promise(async (reject, resolve) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        const request = new sql.Request();

        request.query(
          `select * from status where tipo = '${type}'`,
          async (err, recordset) => {
            sql.close();
            console.log(recordset);
            if (err || recordset.length === 0)
              return reject({
                name: "error",
                message: "Status não encontrado",
                details: !!err
                  ? "Syntax error: " + err.message
                  : "rowsAffected: " + recordset.length,
              });
            return resolve({
              name: "sucess",
              message: {
                status: recordset,
              },
            });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  getStatus,
};
