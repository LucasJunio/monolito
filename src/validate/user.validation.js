const Joi = require('joi');
const Log = require('../models/log.model');

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason)
})

const validationMiddleware = (arrayobject, callback) => {

  let i = 0
  let e = 0
  let errors = []

  arrayobject.map((v, index) => {
    const { error } = userSchema.validate(v)
    const valid = error == null;
    if (error != undefined) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      errors.push({ error: message, cpf: v.CPF, index: index });
      e++
    }
    i++
    if (arrayobject.length === i) {
      e === 0 ? callback(null, true) : callback(errors, false)
    }
  })
}

const userSchema = Joi.object().keys({
  nome: Joi.string(),
  email: Joi.string(),
  senha: Joi.number().allow(null, ''),
  celular: Joi.number().allow(null, ''),
})

module.exports = validationMiddleware;