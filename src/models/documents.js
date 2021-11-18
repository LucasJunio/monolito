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

async function uploadDocuments(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const conndocs = new sql.Connection(config);
      conndocs.connect().then(() => {
        let req = new sql.Request(conndocs);
        let arrayupdate = [];

        payload.files.forEach((file) => {
          const body = JSON.parse(payload.body.info);
          const info = body.itens.filter(
            (info) => info.filename === file.originalname
          );
          const [{ categorie, filename }] = info;
          const { idClient, product } = body;

          const file64 = Buffer.from(file.buffer).toString("base64");

          if (!idClient || !categorie || !filename || !product)
            return reject({
              name: "error",
              message: "Arquivos com campos em branco!",
            });

          req.query(
            `
                    
                    IF (EXISTS(SELECT * FROM usuario WHERE id = ${idClient}))       
                    
                    IF (EXISTS(SELECT * FROM documentos WHERE id_usuario = ${idClient} and categoria='${categorie}'))
                    BEGIN
                    UPDATE documentos SET data=GETDATE(), nome='${filename}', base64 = '${file64}', status='AGUARDANDO APROVAÇÃO' WHERE id_usuario = ${idClient} and categoria='${categorie}'
                    UPDATE usuario SET status='AGUARDANDO APROVAÇÃO'  WHERE id = ${idClient}
                    select nome from documentos WHERE id_usuario = ${idClient} and categoria='${categorie}'
                    END
                    ELSE

                    BEGIN
                    INSERT INTO documentos
                    (data
                    ,produto
                    ,id_usuario
                    ,nome
                    ,categoria
                    ,alterado_por
                    ,status
                    ,data_status
                    ,base64
                    --,binario
                    )
                    VALUES
                    (GETDATE()
                    ,'${product}'
                    , ${idClient}
                    ,'${filename}'
                    ,'${categorie}'
                    ,NULL
                    ,'AGUARDANDO APROVAÇÃO'
                    ,GETDATE()
                    ,'${file64}'
                    --,@bin
                    )

                    UPDATE usuario SET status='AGUARDANDO APROVAÇÃO'  WHERE id = ${idClient}
                    select nome from documentos where id = (SELECT SCOPE_IDENTITY())
                    END


                    ELSE
                    BEGIN
                    select 0 as rowsAffected
                    END`,
            async (err, recordset) => {
              if (err) {
                return reject({ name: "error", message: err });
              }
              arrayupdate.push(recordset[0].nome);
              if (arrayupdate.length === payload.files.length) {
                return resolve({
                  name: "success",
                  message: `Upload dos arquivos: [${arrayupdate}] realizados com sucesso!`,
                });
              }
            }
          );
        });

        conndocs.close();
      });
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = {
  readDocuments,
  updateStatusDocuments,
  uploadDocuments,
};
