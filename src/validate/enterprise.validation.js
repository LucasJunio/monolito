const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await enterpriseSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const enterpriseSchema = Joi.object().keys({

  cnpj: Joi.string().min(14).max(45).required(),
  cnae: Joi.number().required(),
  razao_social: Joi.string().min(1).max(150).required(),
  telefone_fixo: Joi.string().allow(null, '').max(45),
  celular: Joi.string().allow(null, '').max(45),
  nome_fantasia: Joi.string().min(1).max(150).required(),
  site: Joi.string().min(5).max(150).required(),

})

module.exports = { validationMiddleware, enterpriseSchema }