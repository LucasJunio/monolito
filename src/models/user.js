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
                                INSERT into usuario_admin (nome, email, status) 
                                OUTPUT Inserted.id, Inserted.nome
                                values ('${payload.nome}', '${payload.email}', '${payload.status}')
                                END
                                `,
          async (err, recordset) => {
            await sql.close();

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
              message: [{ id: recordset[0].id, nome: recordset[0].nome }],
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
      sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        let request = new sql.Request();

        request.query(`select * from usuario_admin`, async (err, recordset) => {
          await sql.close();

          if (err) return reject({ name: "error", message: err });

          return resolve({ name: "success", message: recordset });
        });
      });
    } catch (error) {
      await sql.close();
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

async function delUserAdmin(authHeader) {
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

        const parts = authHeader.split(" ");
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

        request.query(
          `delete 
                               from usuario_admin
                               where email ='${decoded.email}'
                               select @@ROWCOUNT as rowsAffected`,
          async (err, recordset) => {
            await sql.close();

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
      (!email || !nome || !cpf || !celular || !senha || !id) &&
        reject({
          name: "error",
          message: "Os campos email, nome, cpf, celular, id e senha",
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
                    senha = '${hash}'
                  where id = ${id};                           
                  select @@ROWCOUNT as rowsAffected
              END
                ELSE
                BEGIN                                
                  select 0 as rowsAffected
                END`,
              async (err, recordset) => {
                console.log(recordset);
                sql.close();
                if (err || recordset[0].rowsAffected === 0)
                  return reject({
                    name: "error",
                    message: "Usuário não encontrado",
                    details: !!err
                      ? "Syntax error: " + err.message
                      : "rowsAffected: " + recordset.length,
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

module.exports = {
  createUserAdmin,
  readUserAdmin,
  putUserAdmin,
  delUserAdmin,
  readUserAdminID,
  finishRegister,
};
