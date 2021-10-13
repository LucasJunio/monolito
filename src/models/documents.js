require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

async function readDocuments(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
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
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readDocuments
};

