require('dotenv').config()
const sql = require("mssql");
const bcrypt = require('bcrypt');

const { config } = require('../config/settings');

const { userAdminSchema } = require('../validate/user.validation');

async function createUserAdmin(payload) {

    return new Promise(async (resolve, reject) => {
        try {
            sql.connect(config, async (err) => {

                if (err) return reject({ name: 'Conexão com o banco de dados falhou.', message: err })

                const { error } = await userAdminSchema.validate(payload)

                if (error) return reject({ name: 'Falha na validação dos dados.', message: error.details[0].message })

                let request = new sql.Request();

                bcrypt.genSalt(10, function (err, salt) {

                    if (err) return reject({ name: 'Falha na genSalt bcrypt.', message: err })

                    bcrypt.hash(payload.senha, salt, function (err, hash) {

                        if (err) return reject({ name: 'Falha no hash da senha via bcrypt.', message: err })

                        request.query(`insert into usuario_admin (nome, email, senha, cpf, status) 
                                        values ('${payload.nome}', '${payload.email}', 
                                        '${payload.senha}', '${payload.cpf}', '${payload.status}')`, async (err, recordset) => {

                            await sql.close();
        
                            if (err) return reject({ name: 'Usuário administrativo não cadastrado.', message: err })
        
                            return resolve({ name: 'success' })
                        });                     
                    })
                });                
            });
        } catch (error) {
            await sql.close();
            return reject(error)
        }
    });
}


module.exports = { createUserAdmin }