const router = require('express').Router();

require('dotenv').config()
const fileconfig = require("../config/settings");
const email = fileconfig.email
const twilio = fileconfig.twilioconfig
const client = require('twilio')(twilio.accountSid, twilio.authToken);
const jwt = require('jsonwebtoken');
const sql = require("mssql");

const generateOTP = () => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

// Email and SMS validation
router.post('/', async (req, res) => {

    const token = jwt.sign({ data: req.body.username }, 'stringsecret', { expiresIn: process.env.EXPIRE });
    let token1 = ''
    const mobilenumber = req.body.celular.toString().replace(/[() -]/g, '')

    const message = {
        from: 'contato@vilevepay.com.br',
        to: req.body.email,
        subject: 'Confirmação de Conta Vileve',
        html: `
    Olá ${req.body.nome}, <br>
    <h2>Seja bem vindo ao gateway de pagamentos vileve.</h2> <br> Clique no link abaixo para confirmar sua conta.
    <br> <a href='http://www.vileve.com.br'>Clique para confirmar sua conta</a> <br>  `
    }


    const conn = new sql.Connection(fileconfig.config);
    conn.connect().then(() => {
        const reqsql = new sql.Request(conn);
        token1 = generateOTP()
        reqsql.query(`INSERT INTO Clientes (data, nome, email, celular, senha, token1) VALUES (GETDATE(), '${req.body.nome}', '${req.body.email}', '${req.body.celular}', HASHBYTES('SHA2_512', '${req.body.senha}') , '${token1}')`, function (err, recordset) {
            if (err) {
                res.status(200).send(`alert('Erro de banco de dados, tente novamente!')`)
            } else {
                sendmail()
            }
        });
        conn.close();
    });

    const sendmail = () => {
        email.sendMail(message, function (err, info) {
            if (err) { res.status(401).send(`alert('${err}')`) } else { sendSMS() }
        });
    }

    const sendSMS = () => {
        client.messages
            .create({
                body: 'Token SMS Gateway Vileve: ' + token1,
                from: '+14158549567',
                to: '+55' + mobilenumber
            })
            .then(message => res.status(200).send(`
                alert('Cadastro realizado com sucesso! Verifique seu email para confirmação!');
                localStorage.setItem('token', '${token}');
                top.location.href='/home'
                `))
            .catch(err => res.status(401).send(`alert('Desculpe, este número de celular informado é inválido!')`))
    }

})


module.exports = router;