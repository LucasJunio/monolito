const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await addressSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const addressSchema = Joi.object().keys({
  
  cep: Joi.string().min(1).max(45).required(),
  endereco: Joi.string().min(1).max(150).required(),
  complemento: Joi.string().allow(null, '').max(150),
  bairro: Joi.string().min(1).max(150).required(),
  cidade: Joi.string().min(1).max(150).required(),
  estado: Joi.string().min(1).max(150).required(),
  numero: Joi.number()

})

module.exports = { validationMiddleware, addressSchema }