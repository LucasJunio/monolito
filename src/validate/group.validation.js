const Joi = require('joi');

const postGroupSchema = Joi.object().keys({
  nome: Joi.string().min(1).max(150).required().messages({
    'string.base': `Nome deve ser do tipo número (string).`,
    'string.min': `Nome deve ter no mínimo {#limit} caracteres.`,
    'string.max': `Nome deve ter no máximo {#limit} caracteres.`,
    'string.empty': `Nome não deve ser um campo vazio.`,
    'any.required': `Nome é um campo requerido`
  }),
})

module.exports = { postGroupSchema }