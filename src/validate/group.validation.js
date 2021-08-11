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

const relationshipUserGroupSchema = Joi.object().keys({
  fk_id_usu_adm: Joi.number().required().messages({
    'number.base': `fk_id_usu_adm deve ser do tipo número (int).`,
    'number.empty': `fk_id_usu_adm não deve ser um campo vazio.`,
    'any.required': `fk_id_usu_adm é um campo requerido`
  }),
  fk_id_grupo: Joi.number().required().messages({
    'number.base': `fk_id_grupo deve ser do tipo número (int).`,
    'number.empty': `fk_id_grupo não deve ser um campo vazio.`,
    'any.required': `fk_id_grupo é um campo requerido`
  }),
})

module.exports = { postGroupSchema, relationshipUserGroupSchema }