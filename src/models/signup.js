require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { config } = require('../config/settings');
const userValidation = require('../validate/user.validation');
const { sendEmail, sendSms } = require('./validation');

const signup = async (payload) => {

    return new Promise(async function (resolve, reject) {

        await sql.connect(config, function (err) {
                if (err) {
                    reject(err)
                } else {

                    let request = new sql.Request();

                    userValidation(payload.usuario, async (err, result) => {
                        if (result) {
                            await bcrypt.genSalt(10, function (err, salt) {
                                bcrypt.hash(payload.senha, salt, function (err, hash) {

                                    let querysql = `
                                                BEGIN TRAN   
                                                BEGIN TRY
                                                insert into usuario
                                                        (data, nome, email, celular, senha, token_sms, validacao) 
                                                        values (GETDATE(), '${payload.usuario.nome}', '${payload.usuario.email}', 
                                                        '${payload.usuario.celular}',
                                                        '${hash}', '${generateOTP()}', 0)
    
                                                insert into pessoa (cpf, id_usuario) 
                                                    values ('${payload.pessoa.cpf}', (SELECT SCOPE_IDENTITY()))
    
                                                insert into empresa (id_pessoa, cnpj, cnae, razao_social, telefone_fixo, celular, nome_fantasia, site) 
                                                    values ((SELECT SCOPE_IDENTITY()), '${payload.empresa.cnpj}', '${payload.empresa.cnae}', '${payload.empresa.razao_social}',
                                                    '${payload.empresa.telefone_fixo}', '${payload.empresa.celular}', '${payload.empresa.nome_fantasia}', '${payload.empresa.site}')
    
                                                insert into conta (id, banco, agencia, conta, operacao, pix) 
                                                    values ('${payload.empresa.cnpj}', '${payload.conta.banco}', '${payload.conta.agencia}', 
                                                    '${payload.conta.conta}', '${payload.conta.operacao}', '${payload.conta.pix}')
    
    
                                                insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                                                    values ('${payload.empresa.cnpj}', '${payload.endereco_cnpj.cep}', '${payload.endereco_cnpj.complemento}',
                                                    '${payload.endereco_cnpj.endereco}', '${payload.endereco_cnpj.numero}', '${payload.endereco_cnpj.bairro}')
    
                                                insert into endereco (id, cep, complemento, endereco, numero,  bairro) 
                                                    values ('${payload.pessoa.cpf}', '${payload.endereco_cpf.cep}', '${payload.endereco_cpf.complemento}',
                                                    '${payload.endereco_cpf.endereco}', '${payload.endereco_cpf.numero}', '${payload.endereco_cpf.bairro}')
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

                                        if (recordset[0].ErrorMessage) {
                                            // callback({ message: 'transação atômica não efetuada', err: recordset[0].ErrorMessage }, false)
                                            // return;
                                            reject({ name: 'transação atômica não efetuada', message: recordset[0].ErrorMessage })
                                        };

                                        sql.close();

                                        sendEmail(payload.usuario, (err, result) => {
                                            if (!result.success) {
                                                reject({ message: 'usuário cadastrado, mas email não enviado.', err }, false)
                                                // return;
                                            } else {
                                                sendSms(payload.usuario, (err, result) => {
                                                    if (!result.success) {
                                                        reject({ message: 'usuário cadastrado, email enviado, mas sms não enviado.', err }, false)
                                                        // return;
                                                    } else {

                                                        resolve({ token: result.token, success: true })
                                                    }
                                                })
                                            }
                                        })
                                    });
                                })
                            });
                        } else {
                            callback(err, false)
                            return;
                        }
                    })
                }
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