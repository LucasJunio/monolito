const Joi = require('joi');

async function validatePerson(payload) {

  return new Promise(async function (resolve, reject) {

    const { error } = await personSchema.validate(payload)

    if (error)
      return reject({ name: 'Falha na validação dos dados.', message: error })

    return resolve()
  })
}

const personSchema = Joi.object().keys({
  
  cpf: Joi.string().min(11).max(45).required().messages({
    'string.base': `CPF deve ser do tipo número (string).`,
    'string.empty': `CPF não deve ser um campo vazio.`,
    'string.max': `CPF deve ter no máximo {#limit} caracteres.`,
    'string.min': `CPF deve ter no mínimo {#limit} caracteres.`,
    'any.required': `CPF é um campo requerido`
  }),
  celular: Joi.string().min(8).max(45).required().messages({
    'string.base': `Celular deve ser do tipo número (string).`,
    'string.min': `Celular deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Celular deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Celular não deve ser um campo vazio.`,
    'any.required': `Celular é um campo requerido`
  }),
  nascimento: Joi.date().required().messages({
    'date.base': `Nascimento deve ser do tipo data.`,
    'date.empty': `Nascimento não deve ser um campo vazio.`,
    'any.required': `Nascimento é um campo requerido`
  }),
  naturalidade: Joi.string().min(1).max(150).required().messages({
    'string.base': `Naturalidade deve ser do tipo texto.`,
    'string.min': `Naturalidade deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Naturalidade deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Naturalidade não deve ser um campo vazio.`,
    'any.required': `Naturalidade é um campo requerido`
  }),
  nacionalidade: Joi.string().min(1).max(150).required().messages({
    'string.base': `Nacionalidade deve ser do tipo texto.`,
    'string.min': `Nacionalidade deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Nacionalidade deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Nacionalidade não deve ser um campo vazio.`,
    'any.required': `Nacionalidade é um campo requerido`
  }),
  estado_civil: Joi.string().min(1).max(45).required().messages({
    'string.base': `Estado Civil deve ser do tipo texto.`,
    'string.min': `Estado Civil deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Estado Civil deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Estado Civil não deve ser um campo vazio.`,
    'any.required': `Estado Civil é um campo requerido`
  }),
  rg: Joi.string().min(5).max(45).required().messages({
    'string.base': `RG deve ser do tipo número (string).`,
    'string.min': `RG deve ter no mínimo {#limit} caracteres.`,
    'string.max': `RG deve ter no máximo {#limit} caracteres.`,
    'string.empty': `RG não deve ser um campo vazio.`,
    'any.required': `RG é um campo requerido`
  }),
  emissor: Joi.string().min(1).max(150).required().messages({
    'string.base': `Emissor deve ser do tipo texto.`,
    'string.min': `Emissor deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Emissor deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Emissor não deve ser um campo vazio.`,
    'any.required': `Emissor é um campo requerido`
  }),
  emissao: Joi.date().required().messages({
    'date.base': `Emissão deve ser do tipo data.`,
    'date.empty': `Emissão não deve ser um campo vazio.`,
    'any.required': `Emissão é um campo requerido`
  }),
  sexo: Joi.string().min(1).max(45).required().messages({
    'string.base': `Sexo deve ser do tipo texto.`,
    'string.min': `Sexo deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Sexo deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Sexo não deve ser um campo vazio.`,
    'any.required': `Sexo é um campo requerido`
  }),
  mae: Joi.string().min(1).max(150).required().messages({
    'string.base': `Nome da mãe deve ser do tipo texto.`,
    'string.min': `Nome da mãe deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Nome da mãe deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Nome da mãe não deve ser um campo vazio.`,
    'any.required': `Nome da mãe é um campo requerido`
  }),
  pai: Joi.string().min(1).max(150).required().messages({
    'string.base': `Nome do pai deve ser do tipo texto.`,
    'string.min': `Nome do pai deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Nome do pai deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Nome do pai não deve ser um campo vazio.`,
    'any.required': `Nome do pai é um campo requerido`
  }),

})

module.exports = { validatePerson, personSchema }