const sql = require("mssql");
const { config } = require("../config/settings");

const getCode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      logger.debug(`Inicio da busca por codigo`);
      const pool = await sql.connect(config);
      const result = await pool.request().query(`select * from embed`);
      if (result.length === 0) reject({ name: "error", message: result });
      logger.debug(`Codigo encontrado com sucesso`);
      pool.close();
      resolve({ name: "success", message: result });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getCode,
};
