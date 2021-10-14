require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

const readDocuments = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const connreaddoc = new sql.Connection(config);
            connreaddoc.connect().then(() => {
                var req = new sql.Request(connreaddoc);
                req.query(`
                
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


                `, async (err, recordset) => {
                    if (err) reject({ name: "error", message: err });
                    !!recordset[0] ? resolve({ name: "success", message: recordset }) : resolve({ name: "success", message: 'Não há arquivos para este usuário!' });
                });
                connreaddoc.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

const updateStatusDocuments = (payload) => {

    return new Promise(async (resolve, reject) => {
        try {
            const connUpdateDoc = new sql.Connection(config);
            connUpdateDoc.connect().then(() => {
                var req = new sql.Request(connUpdateDoc);
                req.query(`                 
                    
                    IF (EXISTS(SELECT * FROM documentos WHERE id = ${payload.id}))
                    BEGIN
                    UPDATE documentos SET data_status=GETDATE(), alterado_por='${payload.usuario}', status = '${payload.status}' WHERE id = ${payload.id}
                    select 1 as rowsAffected
                    END
                    ELSE 
                    BEGIN
                    select 0 as rowsAffected
                    END

                `, async (err, recordset) => {
                    console.log(recordset)
                    if (err) reject({ name: "error", message: err });
                    !!recordset[0] ? resolve({ name: "success", message: 'Status alterado com sucesso!' }) : resolve({ name: "success", message: 'Não há arquivo com o id atribuído!' });
                });
                connUpdateDoc.close();
            });
        } catch (error) {
            return reject(error);
        }
    });

}

module.exports = {
    readDocuments,
    updateStatusDocuments
};

