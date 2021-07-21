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
  senha: Joi.string().max(1000).required(),

})

module.exports = validationMiddleware;