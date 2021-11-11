const { log } = require("../middleware/log");

async function changeLogLevel({ level }) {
  return new Promise(async (resolve, reject) => {
    try {
      !level &&
        reject({
          name: "error",
          message: "O atributo Level é obrigatório",
        });

      const logLevelList = [
        "error",
        "warn",
        "info",
        "http",
        "verbose",
        "debug",
        "silly",
      ];

      logLevelList.indexOf(level) === -1 &&
        reject({
          name: "error",
          message: "Log level inválido",
        });

      global.logLevel = level;
      log();

      resolve({
        name: "success",
        message: `Log level alterado para ${level}`,
      });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  changeLogLevel,
};
