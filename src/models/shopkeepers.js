require("dotenv").config();
const { response } = require("express");
const sql = require("mssql");
const { config } = require("../config/settings");

async function readShopkeeperid(id) {

    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
                req.query(`select * from View_Cadastro_Lojista where id_usuario = ${id}`, async (err, recordset) => {

                    if (err) return reject({ name: "error", message: err });
                    if (!recordset[0]) return reject({ name: "error", message: 'id não encontrado na base de dados' });

                    let bodyjson = ''
                    if (!!recordset[0].cnpj) {


                        bodyjson = {
                            "usuario": {
                                "id": recordset[0].id_usuario,
                                "nome": recordset[0].nome,
                                "email": recordset[0].email,
                                "client_id": recordset[0].client_id,
                                "cliente_secret": recordset[0].cliente_secret,
                                "base_64": recordset[0].base_64,
                                "status": recordset[0].status
                            },
                            "pessoa": {
                                "id": recordset[0].id_pessoa,
                                "cpf": recordset[0].cpf,
                                "celular": recordset[0].celular,
                                "nascimento": recordset[0].nascimento,
                                "naturalidade": recordset[0].naturalidade,
                                "nacionalidade": recordset[0].nacionalidade,
                                "estado_civil": recordset[0].estado_civil,
                                "rg": recordset[0].rg,
                                "emissor": recordset[0].emissor,
                                "emissao": recordset[0].emissao,
                                "sexo": recordset[0].sexo,
                                "mae": recordset[0].mae,
                                "pai": recordset[0].pai
                            },
                            "empresa": {
                                "id": recordset[0].id_empresa,
                                "cnpj": recordset[0].cnpj,
                                "cnae": recordset[0].cnae,
                                "razao_social": recordset[0].razao_social,
                                "telefone_fixo": recordset[0].telefone_fixo,
                                "celular": recordset[0].celular,
                                "nome_fantasia": recordset[0].nome_fantasia,
                                "site": recordset[0].site
                            },
                            "conta": {
                                "id": recordset[0].pj_conta_id,
                                "banco": recordset[0].pj_banco,
                                "agencia": recordset[0].pj_agencia,
                                "conta": recordset[0].pj_conta,
                                "operacao": recordset[0].pj_operacao,
                                "pix": recordset[0].pj_pix
                            },
                            "endereco_cnpj": {
                                "id": recordset[0].pj_id_endereco,
                                "cep": recordset[0].pj_cep,
                                "endereco": recordset[0].pj_endereco,
                                "complemento": recordset[0].pj_complemento,
                                "numero": recordset[0].pj_numero,
                                "bairro": recordset[0].pj_bairro,
                                "cidade": recordset[0].pj_cidade,
                                "estado": recordset[0].pj_estado
                            },
                            "endereco_cpf": {
                                "id": recordset[0].pf_id_endereco,
                                "cep": recordset[0].pf_cep,
                                "complemento": recordset[0].pf_complemento,
                                "endereco": recordset[0].pf_endereco,
                                "numero": recordset[0].pf_numero,
                                "bairro": recordset[0].pf_bairro,
                                "cidade": recordset[0].pf_cidade,
                                "estado": recordset[0].pf_estado
                            },
                            "tarifa": {
                                "id": recordset[0].id_tarifa,
                                "risco": recordset[0].risco,
                                "periodo": recordset[0].periodo,
                                "observacao": recordset[0].observacao,
                                "segmento": recordset[0].segmento,
                                "cobranca": recordset[0].cobranca,
                                "faturamento": recordset[0].faturamento,
                                "taxa": recordset[0].taxa
                            }
                        }
                    } else {

                        bodyjson = {
                            "usuario": {
                                "id": recordset[0].id_usuario,
                                "nome": recordset[0].nome,
                                "email": recordset[0].email,
                                "senha": recordset[0].senha,
                                "client_id": recordset[0].client_id,
                                "cliente_secret": recordset[0].cliente_secret,
                                "base_64": recordset[0].base_64,
                                "status": recordset[0].status
                            },
                            "pessoa": {
                                "id": recordset[0].id_pessoa,
                                "cpf": recordset[0].cpf,
                                "celular": recordset[0].celular,
                                "nascimento": recordset[0].nascimento,
                                "naturalidade": recordset[0].naturalidade,
                                "nacionalidade": recordset[0].nacionalidade,
                                "estado_civil": recordset[0].estado_civil,
                                "rg": recordset[0].rg,
                                "emissor": recordset[0].emissor,
                                "emissao": recordset[0].emissao,
                                "sexo": recordset[0].sexo,
                                "mae": recordset[0].mae,
                                "pai": recordset[0].pai
                            },
                            "conta": {
                                "id": recordset[0].pf_conta_id,
                                "banco": recordset[0].pf_banco,
                                "agencia": recordset[0].pf_agencia,
                                "conta": recordset[0].pf_conta,
                                "operacao": recordset[0].pf_operacao,
                                "pix": recordset[0].pf_pix
                            },
                            "endereco_cpf": {
                                "id": recordset[0].pf_id_endereco,
                                "cep": recordset[0].pf_cep,
                                "complemento": recordset[0].pf_complemento,
                                "endereco": recordset[0].pf_endereco,
                                "numero": recordset[0].pf_numero,
                                "bairro": recordset[0].pf_bairro,
                                "cidade": recordset[0].pf_cidade,
                                "estado": recordset[0].pf_estado
                            },
                            "tarifa": {
                                "id": recordset[0].id_tarifa,
                                "risco": recordset[0].risco,
                                "periodo": recordset[0].periodo,
                                "observacao": recordset[0].observacao,
                                "segmento": recordset[0].segmento,
                                "cobranca": recordset[0].cobranca,
                                "faturamento": recordset[0].faturamento,
                                "taxa": recordset[0].taxa
                            }

                        }
                    }
                    return resolve({ name: "success", message: bodyjson });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

async function updateShopkeeperid(payload) {


    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);

                let querysql = ''



                if (!!payload?.usuario) {
                    querysql += `  
                                UPDATE usuario 
                                SET nome = '${payload.usuario.nome}'
                                    , email = '${payload.usuario.email}'
                                    , client_id = '${payload.usuario.client_id}'
                                    , cliente_secret = '${payload.usuario.cliente_secret}'
                                    , base_64 = '${payload.usuario.base_64}'
                                    , status = '${payload.usuario.status}'
                                WHERE id= ${payload.usuario.id}`
                }

                if (!!payload?.pessoa) {
                    querysql += `  
                                UPDATE pessoa
                                SET cpf = '${payload.pessoa.cpf}'
                                    ,celular = '${payload.pessoa.celular}'
                                    ,emissao = '${payload.pessoa.emissao}'
                                    ,emissor =  '${payload.pessoa.emissor}'
                                    ,estado_civil =  '${payload.pessoa.estado_civil}'
                                    ,mae = '${payload.pessoa.mae}'
                                    ,pai = '${payload.pessoa.pai}'
                                    ,nacionalidade =  '${payload.pessoa.nacionalidade}'
                                    ,nascimento = '${payload.pessoa.nascimento}'
                                    ,naturalidade = '${payload.pessoa.naturalidade}'
                                    ,rg = '${payload.pessoa.rg}'
                                    ,sexo = '${payload.pessoa.sexo}'
                                WHERE id = ${payload.pessoa.id}`
                }

                if (!!payload?.empresa) {
                    querysql += ` 
                                UPDATE empresa
                                SET cnpj = '${payload.empresa.cnpj}'
                                    ,cnae ='${payload.empresa.cnae}'
                                    ,razao_social = '${payload.empresa.razao_social}'
                                    ,telefone_fixo = '${payload.empresa.telefone_fixo}'
                                    ,celular ='${payload.empresa.celular}'
                                    ,nome_fantasia = '${payload.empresa.nome_fantasia}'
                                    ,site = '${payload.empresa.site}'
                                WHERE id = ${payload.empresa.id}`
                }

                if (!!payload?.conta) {
                    querysql += ` 
                                UPDATE  conta
                                SET banco = '${payload.conta.banco}'
                                    ,agencia = '${payload.conta.agencia}'
                                    ,conta = '${payload.conta.conta}'
                                    ,operacao = '${payload.conta.operacao}'
                                    ,pix = '${payload.conta.pix}'
                                WHERE id = '${payload.conta.id}' `
                }

                if (!!payload?.endereco_cnpj) {
                    querysql += ` 
                                UPDATE endereco
                                SET cep ='${payload.endereco_cnpj.cep}'
                                    ,complemento = '${payload.endereco_cnpj.complemento}'
                                    ,endereco = '${payload.endereco_cnpj.endereco}'
                                    ,bairro = '${payload.endereco_cnpj.bairro}'
                                    ,numero = '${payload.endereco_cnpj.numero}'
                                    ,cidade = '${payload.endereco_cnpj.cidade}'
                                    ,estado = '${payload.endereco_cnpj.estado}'
                                WHERE id = '${payload.endereco_cnpj.id}' `
                }

                if (!!payload?.endereco_cpf) {
                    querysql += ` 
                                UPDATE endereco
                                SET  cep ='${payload.endereco_cpf.cep}'
                                    ,complemento = '${payload.endereco_cpf.complemento}'
                                    ,endereco = '${payload.endereco_cpf.endereco}'
                                    ,bairro = '${payload.endereco_cpf.bairro}'
                                    ,numero = '${payload.endereco_cpf.numero}'
                                    ,cidade = '${payload.endereco_cpf.cidade}'
                                    ,estado = '${payload.endereco_cpf.estado}'
                                WHERE id = '${payload.endereco_cpf.id}' `
                }

                if (!!payload?.tarifa) {
                    querysql += ` 
                                UPDATE tarifa
                                SET  risco = '${payload.tarifa.risco}'
                                    ,periodo = '${payload.tarifa.periodo}'
                                    ,observacao = '${payload.tarifa.observacao}'
                                    ,segmento = '${payload.tarifa.segmento}'
                                    ,cobranca = '${payload.tarifa.cobranca}'
                                    ,faturamento = ${payload.tarifa.faturamento}
                                    ,taxa = ${payload.tarifa.risco}
                                WHERE id = '${payload.tarifa.id}' `
                }

                req.query(querysql, async (err, recordset) => {
                    if (err) return reject({ name: "error", message: err });
                    return resolve({ name: "success", message: recordset });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}



async function readShopkeepers({ status }) {
    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
                req.query(`select id_usuario as id, nome, email, cpf, validacao, status from View_Cadastro_Lojista where status in (${status})`, async (err, recordset) => {
                    if (err) return reject({ name: "error", message: err });
                    return resolve({ name: "success", message: recordset });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}


async function uploadDocuments(payload) {
    return new Promise(async (resolve, reject) => {
        try {
            const conndocs = new sql.Connection(config);
            conndocs.connect().then(() => {
                let req = new sql.Request(conndocs);
                let arrayupdate = []

                payload.files.forEach(file => {

                    const body = JSON.parse(payload.body.info)
                    const info = body.itens.filter(info => info.filename === file.originalname)
                    const [{ categorie, filename }] = info
                    const { idClient, product } = body

                    const file64 = Buffer.from(file.buffer).toString("base64")

                    if (!idClient || !categorie || !filename || !product) return reject({ name: "error", message: 'Arquivos com campos em branco!' })

                    req.query(`
                    
                    IF (EXISTS(SELECT * FROM usuario WHERE id = ${idClient}))       
                    
                    IF (EXISTS(SELECT * FROM documentos WHERE id_usuario = ${idClient} and categoria='${categorie}'))
                    BEGIN
                    UPDATE documentos SET data=GETDATE(), nome='${filename}', base64 = '${file64}', status='Aguardando Aprovação' WHERE id_usuario = ${idClient} and categoria='${categorie}'
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
                    ,'Aguardando Aprovação'
                    ,GETDATE()
                    ,'${file64}'
                    --,@bin
                    )
                    select nome from documentos where id = (SELECT SCOPE_IDENTITY())
                    END


                    ELSE
                    BEGIN
                    select 0 as rowsAffected
                    END`, async (err, recordset) => {
                        if (err) {
                            console.error(err)
                            return reject({ name: "error", message: err })
                        };
                        arrayupdate.push(recordset[0].nome)
                        if (arrayupdate.length === payload.files.length) {
                            return resolve({ name: "success", message: `Upload dos arquivos: [${arrayupdate}] realizados com sucesso!` });
                        }
                    });

                })

                conndocs.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readShopkeepers,
    readShopkeeperid,
    updateShopkeeperid,
    uploadDocuments
};

