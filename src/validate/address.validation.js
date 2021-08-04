const Joi = require('joi');

async function validateAddress(payload) {

  return new Promise(async function (resolve, reject) {

    const { error } = await addressSchema.validate(payload)

    if (error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()
  })
}

const addressSchema = Joi.object().keys({
  
  cep: Joi.string().min(1).max(45).required().messages({
    'string.base': `Cep deve ser do tipo número (string).`,
    'string.min': `Cep deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Cep deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Cep não deve ser um campo vazio.`,
    'any.required': `Cep é um campo requerido`
  }),
  endereco: Joi.string().min(1).max(150).required().messages({
    'string.base': `Endereço deve ser do tipo texto.`,
    'string.min': `Endereço deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Endereço deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Endereço não deve ser um campo vazio.`,
    'any.required': `Endereço é um campo requerido`
  }),
  complemento: Joi.string().allow(null, '').max(150).messages({
    'string.base': `Complemento deve ser do tipo texto.`,
    'string.max': `Complemento deve ter no maximo {#limit} caracteres.`,
  }),
  bairro: Joi.string().min(1).max(150).required().messages({
    'string.base': `Bairro deve ser do tipo texto.`,
    'string.min': `Bairro deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Bairro deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Bairro não deve ser um campo vazio.`,
    'any.required': `Bairro é um campo requerido`
  }),
  cidade: Joi.string().min(1).max(150).required().messages({
    'string.base': `Cidade deve ser do tipo texto.`,
    'string.min': `Cidade deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Cidade deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Cidade não deve ser um campo vazio.`,
    'any.required': `Cidade é um campo requerido`
  }),
  estado: Joi.string().min(1).max(150).required().messages({
    'string.base': `Estado deve ser do tipo texto.`,
    'string.min': `Estado deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Estado deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Estado não deve ser um campo vazio.`,
    'any.required': `Estado é um campo requerido`
  }),
  numero: Joi.string().min(1).max(45).required().messages({
    'string.base': `Número deve ser do tipo número (string).`,
    'string.min': `Número deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Número deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Número não deve ser um campo vazio.`,
    'any.required': `Número é um campo requerido`
  }),

})

module.exports = { validateAddress, addressSchema }