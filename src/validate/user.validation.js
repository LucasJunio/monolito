const Joi = require('joi');

async function validationUser(payload) {

  return new Promise(async function (resolve, reject) {

    const { error } = await userSchema.validate(payload)

    if (error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()
  })
}

const userSchema = Joi.object().keys({
  
  nome: Joi.string().min(10).max(150).required().messages({
    'string.base': `Nome deve ser do tipo texto.`,
    'string.empty': `Nome não deve ser um campo vazio.`,
    'string.max': `Nome deve ter no máximo {#limit} caracteres.`,
    'string.min': `Nome deve ter no mínimo {#limit} caracteres.`,
    'any.required': `Nome é um campo requerido`
  }),
  email: Joi.string().min(10).max(150).required().messages({
    'string.base': `Email deve ser do tipo texto.`,
    'string.empty': `Email não deve ser um campo vazio.`,
    'string.max': `Email deve ter no máximo {#limit} caracteres.`,
    'string.min': `Email deve ter no mínimo {#limit} caracteres.`,
    'any.required': `Email é um campo requerido`
  }),
  senha: Joi.string().min(1).max(1000).required().messages({
    'string.base': `Senha deve ser do tipo texto.`,
    'string.min': `Senha deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Senha deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Senha não deve ser um campo vazio.`,
    'any.required': `Senha é um campo requerido`
  }),

})

module.exports = { validationUser, userSchema }