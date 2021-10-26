const sql = require("mssql");
const { config } = require("../config/settings");

async function listByType(types) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!types?.tipo) throw new Error("Parametro tipo não encontrado");
      const connuser = new sql.Connection(config);
      await connuser.connect();
      const selectTypes = types.tipo.split(",");
      const req = new sql.Request(connuser);
      req.query(
        `select nome, tipo, valor from listas where tipo in (${selectTypes});`,
        async (err, recordset) => {
          if (err) return reject({ name: "error", message: err });
          return resolve({ name: "success", message: recordset });
        }
      );
      connuser.close();
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  listByType,
};
