const Joi = require('joi');

const { accountSchema } = require('./account.validation');
const { addressSchema } = require('./address.validation');
const { enterpriseSchema } = require('./enterprise.validation');
const { personSchema } = require('./person.validation');
const { userSchema } = require('./user.validation');

const validationMiddleware = async (object, callback) => {


  const error = []

  const account = await accountSchema.validate(object.conta)
  if(account.error) error.push(account.error.details[0].message)
  const address = await addressSchema.validate(object.endereco_cnpj)
  if(address.error) error.push(address.error.details[0].message)
  const addressCpf = await addressSchema.validate(object.endereco_cpf)
  if(addressCpf.error) error.push(addressCpf.error.details[0].message)
  const enterprise = await enterpriseSchema.validate(object.empresa)
  if(enterprise.error) error.push(enterprise.error.details[0].message)
  const person = await personSchema.validate(object.pessoa)
  if(person.error) error.push(person.error.details[0].message)
  const user = await userSchema.validate(object.usuario)
  if(user.error) error.push(user.error.details[0].message) 
  
  
  
  // const account = await accountSchema.validate(object.conta)
  // const address = await addressSchema.validate(object.endereco_cnpj)
  // const addressCpf = await addressSchema.validate(object.endereco_cpf)
  // const enterprise = await enterpriseSchema.validate(object.empresa)
  // const person = await personSchema.validate(object.pessoa)
  // const user = await userSchema.validate(object.usuario)
  
  // const error = `${account.error} ${address.error} ${addressCpf.error} ${enterprise.error} ${person.error} ${user.error}`
    
  if (account.error || address.error || addressCpf.error || enterprise.error || person.error || user.error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

module.exports = validationMiddleware