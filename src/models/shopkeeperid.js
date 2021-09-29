require("dotenv").config();
const sql = require("mssql");
const { config } = require("../config/settings");

async function readShopkeeperid({ id }) {
    return new Promise(async (resolve, reject) => {
        try {
            const connuser = new sql.Connection(config);
            connuser.connect().then(() => {
                var req = new sql.Request(connuser);
                req.query(`select * from View_Cadastro_Lojista where id = ${id}`, async (err, recordset) => {
                    if (err) reject({ name: "error", message: err });
                    let bodyjson = ''
                    if (!!recordset[0].cnpj) {
                        bodyjson = {
                            "usuario": {
                                "nome": recordset[0].nome,
                                "email": recordset[0].email,
                                "senha": recordset[0].senha
                            },
                            "pessoa": {
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
                                "cnpj": recordset[0].cnpj,
                                "cnae": recordset[0].cnae,
                                "razao_social": recordset[0].razao_social,
                                "telefone_fixo": recordset[0].telefone_fixo,
                                "celular": recordset[0].celular,
                                "nome_fantasia": recordset[0].nome_fantasia,
                                "site": recordset[0].site
                            },
                            "conta": {
                                "banco": recordset[0].pj_banco,
                                "agencia": recordset[0].pj_agencia,
                                "conta": recordset[0].pj_conta,
                                "operacao": recordset[0].pj_operacao,
                                "pix": recordset[0].pj_pix
                            },
                            "endereco_cnpj": {
                                "cep": recordset[0].pj_cep,
                                "endereco": recordset[0].pj_endereco,
                                "complemento": recordset[0].pj_complemento,
                                "numero": recordset[0].pj_numero,
                                "bairro": recordset[0].pj_bairro,
                                "cidade": recordset[0].pj_cidade,
                                "estado": recordset[0].pj_estado
                            },
                            "endereco_cpf": {
                                "cep": recordset[0].pf_cep,
                                "complemento": recordset[0].pf_complemento,
                                "endereco": recordset[0].pf_endereco,
                                "numero": recordset[0].pf_numero,
                                "bairro": recordset[0].pf_bairro,
                                "cidade": recordset[0].pf_cidade,
                                "estado": recordset[0].pf_estado
                            }
                        }
                    } else {
                        bodyjson = {
                            "usuario": {
                                "nome": recordset[0].nome,
                                "email": recordset[0].email,
                                "senha": recordset[0].senha
                            },
                            "pessoa": {
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
                                "banco": recordset[0].pf_banco,
                                "agencia": recordset[0].pf_agencia,
                                "conta": recordset[0].pf_conta,
                                "operacao": recordset[0].pf_operacao,
                                "pix": recordset[0].pf_pix
                            },
                            "endereco_cpf": {
                                "cep": recordset[0].pf_cep,
                                "complemento": recordset[0].pf_complemento,
                                "endereco": recordset[0].pf_endereco,
                                "numero": recordset[0].pf_numero,
                                "bairro": recordset[0].pf_bairro,
                                "cidade": recordset[0].pf_cidade,
                                "estado": recordset[0].pf_estado
                            }
                        }
                    }
                    resolve({ name: "success", message: bodyjson });
                });
                connuser.close();
            });
        } catch (error) {
            return reject(error);
        }
    });
}

module.exports = {
    readShopkeeperid
};

