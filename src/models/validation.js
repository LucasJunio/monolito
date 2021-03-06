require("dotenv").config();
const sql = require("mssql");
const jwt = require("jsonwebtoken");

const { config, from, twilioconfig, email } = require("../config/settings");
const twilio = require("twilio")(
  twilioconfig.accountSid,
  twilioconfig.authToken
);

async function sendEmail(payload) {
  return new Promise(async function (resolve, reject) {
    const token = await jwt.sign(
      { email: payload.email },
      process.env.JWT_SECRET,
      {}
    );

    const message = {
      from,
      to: payload.email,
      subject: "Confirmação de Conta Vileve",
      html: `
            Olá ${payload.nome}, <br>
            <h2>Seja bem vindo ao gateway de pagamentos vileve.</h2> <br> Clique no link abaixo para confirmar sua conta.
            <br> <a href='${process.env.EMAILURL + token}'>Clique para confirmar sua conta</a> <br>  `,
    };

    email.sendMail(message, function (err, info) {
      if (err)
        return reject({
          name: "error",
          message: "E-mail não enviado.",
          details: err,
        });
      return resolve();
    });
  });
}

async function sendSms(token) {
  return new Promise(async function (resolve, reject) {
    sql.connect(config, async function (err) {
      if (err)
        return reject({
          name: "error",
          message: "Conexão com o banco de dados falhou.",
          details: err,
        });

      let request = new sql.Request();

      const parts = token.split(" ");
      const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

      await request.query(
        `select * from usuario u join pessoa p on p.id_usuario = u.id where u.email ='${decoded.email}'`,
        async function (err, recordset) {
          sql.close();

          if (err)
            return reject({
              name: "error",
              message: "Token SMS não encontrado.",
              details: err,
            });

          const mobilenumber = recordset[0].celular
            .toString()
            .replace(/[() -]/g, "");

          twilio.messages
            .create({
              body: "Vileve Way - Token: " + recordset[0].token_sms,
              from: "+14158549567",
              to: `+55${mobilenumber}`,
            })
            .catch((err) => {
              return reject({
                name: "error",
                message: "Erro de envio TWILLIO.",
                details: err,
              });
            });

          return resolve({ name: "success", message: "SMS enviado." });
        }
      );
    });
  });
}

async function validateEmail(token) {
  return new Promise(async function (resolve, reject) {
    try {
      await sql.connect(config, async function (err) {
        if (err) {
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });
        }

        let querysql = new sql.Request();

        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET,
          (err, decode) => {
            if (err) {
              return reject({
                name: "error",
                message: "Email inválido.",
                status: 400,
              });
            } else {
              return decode;
            }
          }
        );

        await querysql.query(
          `update usuario
                                    set validacao = (case
                                                        when validacao = 'Não validado' then 'Email validado'
                                                        when validacao = 'SMS validado' then 'SMS e Email validado'
                                                        when validacao = 'Email validado' then 'Email validado'  
                                                        when validacao = 'SMS e Email validado' then 'SMS e Email validado'
                                                     end)
                                    WHERE email='${decoded.email}' AND validacao is not null
                                    select @@ROWCOUNT as rowsAffected
                                 `,
          async function (err, recordset) {
            sql.close();

            if (err || recordset[0].rowsAffected == 0)
              return reject({
                name: "error",
                message: "Email não validado.",
                details: err,
              });

            return resolve({
              name: "succes",
              message: "Email validado com sucesso.",
            });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

function emailInvitation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      await sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });
      });
      const querysql = new sql.Request();
      const { email: emailPayload, name, id } = payload;
      (!emailPayload || !name || !id) &&
        reject({
          name: "error",
          message: "Nome, id e email são campos obrigatórios",
        });

      const dateExpiration = new Intl.DateTimeFormat("af-ZA", {
        day: "numeric",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(new Date().setDate(new Date().getDate() + 1)));

      const json = `{"id": "${id}","email": "${emailPayload}","nome": "${name}", "dateExpiration": "${dateExpiration}"}`;
      const base64 = Buffer.from(json).toString("base64");

      const message = {
        from,
        to: emailPayload,
        subject: "Convite VileveWay Admin",
        html: `
            Olá ${name}, <br>
            <h2>Seja bem vindo ao vileve way admin.</h2> <br> Clique no link abaixo para confirmar sua conta e finalizar o cadastro.
            <br> <a href='${process.env.EMAILURLREGISTER + base64}'>Clique para confirmar sua conta</a> <br>  `,
      };

      email.sendMail(message, (err) => {
        if (err)
          return reject({
            name: "error",
            message: "E-mail não enviado.",
            details: err,
          });
        querysql.query(
          `update usuario_admin set validacao = 'Email enviado' where email = '${emailPayload}';`
        );
        sql.close();
        return resolve({
          name: "success",
          message: "Email enviado para o usuário",
          status: 200,
        });
      });
    } catch (error) {
      reject(error);
    }
  });
}

function validateSms(token, authHeader) {
  return new Promise(async function (resolve, reject) {
    try {
      sql.connect(config, async function (err) {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        let querysql = new sql.Request();

        const parts = authHeader.split(" ");
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

        await querysql.query(
          `update usuario
                                      set validacao = ( case
                                                          when validacao = 'Não validado' then 'SMS validado'                
                                                          when validacao = 'SMS validado' then 'SMS validado'
                                                          when validacao = 'Email validado' then 'SMS e Email validado'
                                                          when validacao = 'SMS e Email validado' then 'SMS e Email validado'
                                                      end)
                                      where email='${decoded.email}' AND token_sms='${token}' 
                                      AND validacao is not null
                                      select @@ROWCOUNT as rowsAffected
                                  `,
          async function (err, recordset) {
            sql.close();

            if (err || recordset[0].rowsAffected == 0)
              return reject({
                name: "error",
                message: "SMS não validado.",
                details: err,
              });

            return resolve({
              name: "success",
              message: "SMS validado com sucesso.",
            });
          }
        );
      });
    } catch (error) {
      reject(error);
    }
  });
}

function returnStatusValidation(authHeader) {
  return new Promise(async (resolve, reject) => {
    try {
      await sql.connect(config, async (err) => {
        if (err)
          return reject({
            name: "error",
            message: "Conexão com o banco de dados falhou.",
            details: err,
          });

        let querysql = new sql.Request();

        const parts = authHeader.split(" ");
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);

        await querysql.query(
          `select * from usuario u join pessoa p 
                                      on p.id_usuario = u.id where u.email ='${decoded.email}'`,
          async (err, recordset) => {
            await sql.close();

            if (err || recordset === undefined)
              return reject({ message: err || "Registro não encontrado." });

            return resolve({
              name: "success",
              message: recordset[0].validacao,
              celular: recordset[0].celular,
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
  sendEmail,
  sendSms,
  validateEmail,
  validateSms,
  returnStatusValidation,
  emailInvitation,
};
