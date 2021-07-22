const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await personSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const personSchema = Joi.object().keys({
  
  cpf: Joi.string().min(11).max(45).required(),
  celular: Joi.string().min(8).max(45).required(),
  nascimento: Joi.date().required(),
  naturalidade: Joi.string().min(1).max(150).required(),
  nacionalidade: Joi.string().min(1).max(150).required(),
  estado_civil: Joi.string().min(1).max(45).required(),
  rg: Joi.string().min(5).max(45).required(),
  emissor: Joi.string().min(1).max(150).required(),
  emissao: Joi.date().required(),
  sexo: Joi.string().min(1).max(45).required(),
  mae: Joi.string().min(1).max(150).required(),
  pai: Joi.string().min(1).max(150).required(),

})

module.exports = { validationMiddleware, personSchema }