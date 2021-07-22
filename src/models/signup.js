require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');
const validationMiddleware = require('../validate/signup.validation');
const { sendEmail, sendSms } = require('./validation');

const signup = async (payload) => {

    return new Promise(async function (resolve, reject) {

        await sql.connect(config, function (err) {

            if (err) reject({ name: 'Conexão com o banco de dados falhou.', message: err })

            let request = new sql.Request();
            
            validationMiddleware(payload, async (err, result) => {

                if (!result) reject({ name: 'Falha na validação dos dados.', message: err })

                await bcrypt.genSalt(10, function (err, salt) {

                    if (err) reject({ name: 'Falha na genSalt bcrypt.', message: err })

                    bcrypt.hash(payload.usuario.senha, salt, function (err, hash) {

                        if (err) reject({ name: 'Falha no hash da senha via bcrypt.', message: err })

                        payload.usuario.tokenSms = generateOTP()

                         let querysql = `
                                        BEGIN TRAN
                                        BEGIN TRY
                                        insert into usuario
                                                (data, nome, email, senha, token_sms, validacao) 
                                                values (GETDATE(), '${payload.usuario.nome}', '${payload.usuario.email}',                                                 
                                                '${hash}', '${payload.usuario.tokenSms}', 0)

                                        insert into pessoa (cpf, id_usuario, celular, emissao, 
                                            emissor, estado_civil, mae, pai, nacionalidade, nascimento, naturalidade, rg, sexo) 
                                            values ('${payload.pessoa.cpf}', (SELECT SCOPE_IDENTITY()), '${payload.pessoa.celular}',
                                            '${payload.pessoa.emissao}','${payload.pessoa.emissor}', '${payload.pessoa.estado_civil}',
                                            '${payload.pessoa.mae}', '${payload.pessoa.pai}', '${payload.pessoa.nacionalidade}',
                                            '${payload.pessoa.nascimento}', '${payload.pessoa.naturalidade}', '${payload.pessoa.rg}',
                                            '${payload.pessoa.sexo}')

                                        insert into empresa (id_pessoa, cnpj, cnae, razao_social, telefone_fixo, celular, nome_fantasia, site) 
                                            values ((SELECT SCOPE_IDENTITY()), '${payload.empresa.cnpj}', '${payload.empresa.cnae}', '${payload.empresa.razao_social}',
                                            '${payload.empresa.telefone_fixo}', '${payload.empresa.celular}', '${payload.empresa.nome_fantasia}', '${payload.empresa.site}')

                                        insert into conta (id, banco, agencia, conta, operacao, pix) 
                                            values ('${payload.empresa.cnpj}', '${payload.conta.banco}', '${payload.conta.agencia}', 
                                            '${payload.conta.conta}', '${payload.conta.operacao}', '${payload.conta.pix}')


                                        insert into endereco (id, cep, complemento, endereco, numero,  bairro, cidade, estado) 
                                            values ('${payload.empresa.cnpj}', '${payload.endereco_cnpj.cep}', 
                                            '${payload.endereco_cnpj.complemento}', '${payload.endereco_cnpj.endereco}',
                                            '${payload.endereco_cnpj.numero}', '${payload.endereco_cnpj.bairro}',
                                            '${payload.endereco_cnpj.cidadepj}', '${payload.endereco_cnpj.estadopj}')

                                        insert into endereco (id, cep, complemento, endereco, numero,  bairro, cidade, estado) 
                                            values ('${payload.pessoa.cpf}', '${payload.endereco_cpf.cep}', '${payload.endereco_cpf.complemento}',
                                            '${payload.endereco_cpf.endereco}', '${payload.endereco_cpf.numero}', '${payload.endereco_cpf.bairro}',
                                            '${payload.endereco_cpf.cidade}', '${payload.endereco_cpf.estado}')
                                        select * from usuario where email ='${payload.usuario.email}'
                                        COMMIT TRAN
                                        END TRY
                                        BEGIN CATCH
                                        SELECT
                                            ERROR_NUMBER() AS ErrorNumber,
                                            ERROR_STATE() AS ErrorState,
                                            ERROR_SEVERITY() AS ErrorSeverity,
                                            ERROR_PROCEDURE() AS ErrorProcedure,
                                            ERROR_LINE() AS ErrorLine,
                                            ERROR_MESSAGE() AS ErrorMessage;
                                        ROLLBACK TRAN
                                        END CATCH
                                        `
                        request.query(querysql, async function (err, recordset) {

                            sql.close();
 
                            if (recordset[0].ErrorMessage) reject({ name: 'Falha no cadastro do usuário, tente efetuar novamente.', message: recordset[0].ErrorMessage })

                            const token = await jwt.sign({ email: payload.usuario.email }, process.env.JWT_SECRET, {
                                expiresIn: 86400,
                            })

                            let error = []

                            sendEmail(payload.usuario).catch(err => error.push(err));
                            sendSms(payload.pessoa).catch(err => error.push(err));

                            resolve({ 
                                message: 'Usuário cadastrado com sucesso.',
                                token, 
                                error: error
                            })     
                        });
                    })
                });
            })
        });
    })
}

function generateOTP() {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

module.exports = { signup }