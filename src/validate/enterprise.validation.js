const Joi = require('joi');

async function validationEnterprise(payload) {

  return new Promise(async function (resolve, reject) {

    const { error } = await enterpriseSchema.validate(payload)

    if (error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()
  })
}

const enterpriseSchema = Joi.object().keys({

  cnpj: Joi.string().min(14).max(45).required().messages({
    'string.base': `CNPJ deve ser do tipo número (string).`,
    'string.min': `CNPJ deve ter no mínimo {#limit} caracteres.`,
    'string.max': `CNPJ deve ter no maximo {#limit} caracteres.`,
    'string.empty': `CNPJ não deve ser um campo vazio.`,
    'any.required': `CNPJ é um campo requerido`
  }),
  cnae: Joi.number().required().messages({
    'number.base': `CNAE deve ser do tipo número.`,
    'number.empty': `CNAE não deve ser um campo vazio.`,
    'any.required': `CNAE é um campo requerido`
  }),
  razao_social: Joi.string().min(1).max(150).required().messages({
    'string.base': `Razão Social deve ser do tipo texto.`,
    'string.min': `Razão Social deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Razão Social deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Razão Social não deve ser um campo vazio.`,
    'any.required': `Razão Social é um campo requerido`
  }),
  telefone_fixo: Joi.string().allow(null, '').max(45).messages({
    'string.base': `Telefone fixo deve ser do tipo número (string).`,
    'string.max': `Telefone fixo deve ter no maximo {#limit} caracteres.`,
  }),
  celular: Joi.string().allow(null, '').max(45).messages({
    'string.base': `Celular deve ser do tipo numero (string).`,
    'string.max': `Celular deve ter no maximo {#limit} caracteres.`,
  }),
  nome_fantasia: Joi.string().min(1).max(150).required().messages({
    'string.base': `Nome fantasia deve ser do tipo texto.`,
    'string.min': `Nome fantasia deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Nome fantasia deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Nome fantasia não deve ser um campo vazio.`,
    'any.required': `Nome fantasia é um campo requerido`
  }),
  site: Joi.string().min(5).max(150).required().messages({
    'string.base': `Site deve ser do tipo texto.`,
    'string.min': `Site deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Site deve ter no maximo {#limit} caracteres.`,
    'string.empty': `Site não deve ser um campo vazio.`,
    'any.required': `Site é um campo requerido`
  }),

})

module.exports = { validationEnterprise, enterpriseSchema }