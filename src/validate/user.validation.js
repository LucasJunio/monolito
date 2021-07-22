const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await userSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const userSchema = Joi.object().keys({
  
  nome: Joi.string().min(10).max(150).required().messages({
    'string.base': `Nome deve ser do tipo texto.`,
    'string.empty': `Nome não deve ser um campo vazio.`,
    'string.min': `Nome deve ter no mínimo {#limit} caracteres.`,
    'any.required': `Nome é um campo requerido`
  }),
  email: Joi.string().min(10).max(150).required().messages({
    'string.base': `Email deve ser do tipo texto.`,
    'string.empty': `Email não deve ser um campo vazio.`,
    'string.min': `Email deve ter no mínimo {#limit} caracteres.`,
    'any.required': `Email é um campo requerido`
  }),
  senha: Joi.string().max(1000).required(),

})

module.exports = { validationMiddleware, userSchema }