const Joi = require('joi');

const { accountSchema } = require('./account.validation');
const { addressSchema } = require('./address.validation');
const { enterpriseSchema } = require('./enterprise.validation');
const { personSchema } = require('./person.validation');
const { userSchema } = require('./user.validation');

async function validateSignupCNPJ(payload) {

  return new Promise(async function (resolve, reject) {

    const error = []

    const account = await accountSchema.validate(payload.conta)
    if (account.error) error.push(account.error.details[0].message)
    const address = await addressSchema.validate(payload.endereco_cnpj)
    if (address.error) error.push(address.error.details[0].message)
    const addressCpf = await addressSchema.validate(payload.endereco_cpf)
    if (addressCpf.error) error.push(addressCpf.error.details[0].message)
    const enterprise = await enterpriseSchema.validate(payload.empresa)
    if (enterprise.error) error.push(enterprise.error.details[0].message)
    const person = await personSchema.validate(payload.pessoa)
    if (person.error) error.push(person.error.details[0].message)
    const user = await userSchema.validate(payload.usuario)
    if (user.error) error.push(user.error.details[0].message)

    if (account.error || address.error || addressCpf.error || enterprise.error || person.error || user.error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()

  })
}

async function validateSignupCPF(payload) {

  return new Promise(async function (resolve, reject) {

    const error = []

    const account = await accountSchema.validate(payload.conta)
    if (account.error) error.push(account.error.details[0].message)
    const address = await addressSchema.validate(payload.endereco_cpf)
    if (address.error) error.push(address.error.details[0].message)    
    const person = await personSchema.validate(payload.pessoa)
    if (person.error) error.push(person.error.details[0].message)
    const user = await userSchema.validate(payload.usuario)
    if (user.error) error.push(user.error.details[0].message)

    if (account.error || address.error || person.error || user.error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()

  })
}

module.exports = { validateSignupCNPJ, validateSignupCPF }