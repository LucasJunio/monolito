const sql = require("mssql");
const { config } = require("../config/settings");
// const { resolve } = require("mssql/lib/connectionstring");
// const { reject } = require("bcrypt/promises");

const getStatus = ({ type }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pool = await sql.connect(config);
      const result1 = await pool
        .request()
        .query(`select * from status where tipo = '${type}'`);
      resolve({ name: "success", message: result1 });
      pool.close();

      // const connStatus = new sql.Connection(config);
      // const conn = await connStatus.connect();
      // const request = new sql.Request(conn);
      // request.query(
      //   `select * from status where tipo = '${type}'`,
      //   async (err, recordset) => {
      //     if (err) reject({ name: "error", message: err });
      //     resolve({ name: "success", message: recordset });
      //   }
      // );
      // conn.close();

      // sql.connect(config, async (err) => {
      //   if (err)
      //     return reject({
      //       name: "error",
      //       message: "Conexão com o banco de dados falhou.",
      //       details: err,
      //     });

      //   const request = new sql.Request();

      //   request.query(
      //     `select * from status where tipo = '${type}'`,
      //     async (err, recordset) => {
      //       // sql.close();
      //       console.log(recordset);
      //       if (err || recordset.length === 0)
      //         return reject({
      //           name: "error",
      //           message: "Status não encontrado",
      //           details: !!err
      //             ? "Syntax error: " + err.message
      //             : "rowsAffected: " + recordset.length,
      //         });
      //       return resolve({
      //         name: "sucess",
      //         message: {
      //           status: recordset,
      //         },
      //       });
      //     }
      //   );
      // });
    } catch (error) {
      reject(error);
    }
  });
};

// function getStatus({ type }) {
//   return new Promise(async (reject, resolve) => {
//     try {
//       sql.connect(config, async (err) => {
//         if (err)
//           return reject({
//             name: "error",
//             message: "Conexão com o banco de dados falhou.",
//             details: err,
//           });

//         const request = new sql.Request();

//         request.query(
//           `select * from status where tipo = '${type}'`,
//           async (err, recordset) => {
//             // sql.close();
//             console.log(recordset);
//             if (err || recordset.length === 0)
//               return reject({
//                 name: "error",
//                 message: "Status não encontrado",
//                 details: !!err
//                   ? "Syntax error: " + err.message
//                   : "rowsAffected: " + recordset.length,
//               });
//             return resolve({
//               name: "sucess",
//               message: {
//                 status: recordset,
//               },
//             });
//           }
//         );
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

module.exports = {
  getStatus,
};
