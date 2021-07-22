const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await accountSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const accountSchema = Joi.object().keys({
  
  banco: Joi.string().min(1).max(150).required().messages({
    'string.base': `Banco deve ser do tipo texto.`,
    'string.min': `Banco deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Banco deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Banco não deve ser um campo vazio.`,
    'any.required': `Banco é um campo requerido`
  }),
  agencia: Joi.string().min(1).max(45).required().messages({
    'string.base': `Agência deve ser do tipo número (string).`,
    'string.min': `Agência deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Agência deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Agência não deve ser um campo vazio.`,
    'any.required': `Agência é um campo requerido`
  }),
  conta: Joi.string().min(1).max(45).required().messages({
    'string.base': `Conta deve ser do tipo número (string).`,
    'string.min': `Conta deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Conta deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Conta não deve ser um campo vazio.`,
    'any.required': `Conta é um campo requerido`
  }),
  operacao: Joi.string().allow(null, '').max(45).messages({
    'string.base': `Operação deve ser do tipo número (string).`,
    'string.max': `Operação deve ter no maximo {#limit} caracteres.`,
  }),
  pix: Joi.string().allow(null, '').max(500).messages({
    'string.base': `Pix deve ser do tipo texto.`,
    'string.max': `Pix deve ter no maximo {#limit} caracteres.`,
  }),

})

module.exports = { validationMiddleware, accountSchema }