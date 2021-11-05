require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

const readDocuments = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connreaddoc = new sql.Connection(config);
      connreaddoc.connect().then(() => {
        var req = new sql.Request(connreaddoc);
        req.query(
          `
                
                    SELECT doc.id
                        ,doc.data
                        ,doc.produto
                        ,doc.id_usuario
                        ,doc.nome
                        ,re.categoria
                        ,re.descricao
                        ,doc.alterado_por
                        ,doc.status
                        ,doc.data_status
                        ,doc.base64
                        ,doc.binario
                    FROM relacao_documentos re
                    join View_Cadastro_Lojista vw on vw.tipo_pessoa = re.pessoa
                    left join documentos doc on (doc.id_usuario = vw.id_usuario and doc.categoria = re.categoria)
                    where vw.id_usuario = ${id}


                `,
          async (err, recordset) => {
            if (err) reject({ name: "error", message: err });
            !!recordset[0]
              ? resolve({ name: "success", message: recordset })
              : resolve({
                  name: "success",
                  message: "Não há arquivos para este usuário!",
                });
          }
        );
        connreaddoc.close();
      });
    } catch (error) {
      return reject(error);
    }
  });
};

const updateStatusDocuments = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connUpdateDoc = new sql.Connection(config);
      await connUpdateDoc.connect();
      const req = new sql.Request(connUpdateDoc);

      payload.forEach(async ({ usuario, id, status }, index) => {
        await req.query(
          ` IF (EXISTS(SELECT 1 FROM documentos WHERE id = ${id}))
            BEGIN
            UPDATE documentos SET data_status=GETDATE(), alterado_por='${usuario}', status = '${status}' WHERE id = ${id}
            select 1 as rowsAffected
            END
            ELSE
            BEGIN
            select 0 as rowsAffected
            END
          `,
          async (err, recordset) => {
            if (err) reject({ name: "error", message: err });
            if (recordset[0].rowsAffected === 0)
              reject({
                name: "error",
                message: `Falha ao alterar o item da posição ${index} `,
              });
            if (payload.length === index + 1) {
              resolve({
                name: "success",
                message: `Statu(s) de ${
                  index + 1
                } intens alterado(s) com sucesso!`,
              });
            }
          }
        );
      });
      //   console.log("Linha final");
      //   console.log(rowsAffected);

      connUpdateDoc.close();
    } catch (error) {
      return reject(error);
    }
  });
};

module.exports = {
  readDocuments,
  updateStatusDocuments,
};
