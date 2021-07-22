const Joi = require('joi');

const { accountSchema } = require('./account.validation');
const { addressSchema } = require('./address.validation');
const { enterpriseSchema } = require('./enterprise.validation');
const { personSchema } = require('./person.validation');
const { userSchema } = require('./user.validation');

const validationMiddleware = async (object, callback) => {

  const account = await accountSchema.validate(object.conta)
  const address = await addressSchema.validate(object.endereco_cnpj)
  const addressCpf = await addressSchema.validate(object.endereco_cpf)
  const enterprise = await enterpriseSchema.validate(object.empresa)
  const person = await personSchema.validate(object.pessoa)
  const user = await userSchema.validate(object.usuario)
  
  const error = `${account.error} ${address.error} ${addressCpf.error} ${enterprise.error} ${person.error} ${user.error}`
    
  if (account.error || address.error || addressCpf.error || enterprise.error || person.error || user.error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

module.exports = validationMiddleware