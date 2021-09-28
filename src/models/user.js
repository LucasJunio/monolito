require("dotenv").config();
const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { config } = require("../config/settings");

const { userAdminSchema } = require("../validate/user.validation");
const { resolve } = require("mssql/lib/connectionstring");
const { reject } = require("bcrypt/promises");

async function createUserAdmin(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        const { error } = await userAdminSchema.validate(payload);

        if (error)
          return reject({
            name: "error",
            message: "Falha na validação dos dados.",
            details: error.details[0].message,
          });

        let request = new sql.Request();

        request.query(
          ` IF EXISTS(SELECT 'True' FROM usuario_admin WHERE Email= '${payload.email}')
                                BEGIN
                                select 0 as rowsAffected
                                END
                                ELSE
                                BEGIN                                
                                INSERT into usuario_admin (nome, email, status, validacao) 
                                OUTPUT Inserted.id, Inserted.nome, Inserted.validacao
                                values ('${payload.nome}', '${payload.email}', '${payload.status}', 'email não validado')
                                END
                                `,
          async (err, recordset) => {
            await sql.close();
            console.log(recordset);
            if (err || recordset[0].rowsAffected !== undefined)
              return reject({
                name: "error",
                message: "Usuário administrativo não cadastrado.",
                details:
                  recordset[0].rowsAffected !== undefined
                    ? "Email já cadastrado."
                    : err,
                status: 400,
              });

            return resolve({
              name: "success",
              message: [
                {
                  id: recordset[0].id,
                  nome: recordset[0].nome,
                  validacao: recordset[0].validacao,
                },
              ],
            });
          }
        );
      });
    } catch (error) {
      await sql.close();
      return reject(error);
    }
  });
}

async function readUserAdmin() {
  return new Promise(async (resolve, reject) => {
    try {
      const connuser = new sql.Connection(config);
      connuser.connect().then(() => {
        var req = new sql.Request(connuser);
        req.query(`select * from usuario_admin`, async (err, recordset) => {
          if (err) reject({ name: "error", message: err });
          resolve({ name: "success", message: recordset });
        });
        connuser.close();
      });

      // sql.connect(config, async (err) => {
      //   if (err)
      //     return reject({
      //       name: "error",
      //       message: "Conexão com o banco de dados falhou.",
      //       details: err,
      //     });

      //   let request = new sql.Request();

      //   request.query(`select * from usuario_admin`, async (err, recordset) => {
      //     // await sql.close();

      //     if (err) return reject({ name: "error", message: err });

      //     return resolve({ name: "success", message: recordset });
      //   });
      // });
    } catch (error) {
      // await sql.close();
      return reject(error);
    }
  });
}
async function readUserAdminID(id) {
  return new Promise(async (resolve, reject) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        let request = new sql.Request();

        request.query(
          `select * from usuario_admin where id ='${id}'`,
          async (err, recordset) => {
            await sql.close();

            if (err) return reject({ name: "Error", message: err });

            return resolve({ name: "success", message: recordset });
          }
        );
      });
    } catch (error) {
      await sql.close();
      return reject(error);
    }
  });
}

async function putUserAdmin(payload, id) {
  return new Promise(async (resolve, reject) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        const { error } = await userAdminSchema.validate(payload);

        if (error)
          return reject({
            name: "error",
            message: "Falha na validação dos dados.",
            details: error.details[0].message,
          });

        let request = new sql.Request();

        request.query(
          `IF EXISTS(SELECT 'True' FROM usuario_admin WHERE id= '${id}')
                                BEGIN
                                update usuario_admin
                                set email ='${payload.email}', nome ='${payload.nome}', status ='${payload.status}'                                
                                where id ='${id}'                                
                                select @@ROWCOUNT as rowsAffected
                                END
                                ELSE
                                BEGIN                                
                                select 0 as rowsAffected
                                END`,
          async (err, recordset) => {
            await sql.close();

            if (err || recordset[0].rowsAffected == 0)
              return reject({
                name: "error",
                message: "Usuário administrativo não atualizado.",
                details:
                  recordset[0].rowsAffected === 0
                    ? "Email não cadastrado."
                    : err,
                status: 400,
              });

            return resolve({
              name: "success",
              message: "Usuário administrador atualizado.",
            });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

async function delUserAdmin(id) {
  return new Promise(async (resolve, reject) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        let request = new sql.Request();

        console.log(id);

        request.query(
          `  
          IF EXISTS(SELECT 'True' FROM usuario_admin WHERE id= '${id}')
          BEGIN
            delete usu_admin_grupo where
            fk_id_usu_adm ='${id}';

            delete usuario_admin where
            id='${id}';                           
            select @@ROWCOUNT as rowsAffected
          END
          ELSE
          BEGIN                                
            select 0 as rowsAffected
          END
          `,
          async (err, recordset) => {
            await sql.close();

            if (err || recordset[0].rowsAffected === 0)
                  return reject({
                    name: "error",
                    message: "Falha na exclusão do usuário, tente efetuar novamente.",
                    details: !!err
                      ? "Syntax error: " + err.message
                      : "rowsAffected: " + recordset[0].rowsAffected,
                  });

            if (err)
              return reject({
                name: "error",
                message: "Usuário administrativo não deletado.",
                details: err,
              });

            return resolve({
              name: "success",
              message: "Usuário administrador excluído.",
            });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

function finishRegister({ email, nome, cpf, celular, ramal, senha, id }) {
  return new Promise((resolve, reject) => {
    try {
      (!email || !nome || !cpf || !senha || !id) &&
        reject({
          name: "error",
          message: "Os campos email, nome, cpf, id e senha",
        });

      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        const request = new sql.Request();
        bcrypt.genSalt(10, (err, salt) => {
          if (err)
            return reject({
              name: "error",
              message: "Falha na genSalt bcrypt.",
              details: err,
            });
          bcrypt.hash(senha, salt, (err, hash) => {
            if (err)
              return reject({
                name: "error",
                message: "Falha no hash da senha via bcrypt.",
                details: err,
              });
            request.query(
              `IF EXISTS(SELECT 'True' FROM usuario_admin WHERE id= '${id}')
                BEGIN
                  update usuario_admin 
                  set 
                    nome = '${nome}', 
                    email = '${email}', 
                    cpf = '${cpf}', 
                    celular = '${celular}',
                    ramal = '${ramal}',
                    validacao = 'email validado',
                    senha = '${hash}'
                  where id = ${id};                           
                  select @@ROWCOUNT as rowsAffected
              END
                ELSE
                BEGIN                                
                  select 0 as rowsAffected
                END`,
              async (err, recordset) => {                
                sql.close();
                if (err || recordset[0].rowsAffected === 0)
                  return reject({
                    name: "error",
                    message: "Usuário não encontrado",
                    details: !!err
                      ? "Syntax error: " + err.message
                      : "rowsAffected: " + recordset[0].rowsAffected,
                  });

                return resolve({
                  name: "success",
                  message: "Usuário atualizado.",
                });
              }
            );
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function getUserValidation({ email }) {
  return new Promise(async (resolve, reject) => {
    try {
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });
        !email &&
          reject({
            name: "error",
            message: "email é um parametro obrigatório",
          });
        const request = new sql.Request();
        request.query(
          `select validacao from usuario_admin where email = '${email}'`,
          async (err, recordset) => {
            sql.close();
            if (err || recordset.length === 0)
              return reject({
                name: "error",
                message: "Email não encontrado.",
                details: !!err
                  ? "Syntax error: " + err.message
                  : "rowsAffected: " + recordset.length,
              });
            return resolve({
              name: "success",
              message: recordset[0].validacao,
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
  createUserAdmin,
  readUserAdmin,
  putUserAdmin,
  delUserAdmin,
  readUserAdminID,
  finishRegister,
  getUserValidation,
};
