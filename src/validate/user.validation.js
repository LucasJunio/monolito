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
  nome: Joi.string().min(10).max(150).required(),
  email: Joi.string().min(10).max(150).required(),
  celular: Joi.string().min(11).max(11).required(),
  senha: Joi.string().max(1000).required(),
  token1: Joi.string().min(6).max(6),
  token2: Joi.string().min(6).max(6),
})

module.exports = validationMiddleware;