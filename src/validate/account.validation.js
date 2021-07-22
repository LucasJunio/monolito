const Joi = require('joi');

const validationMiddleware = async (object, callback) => {

  const { error } = await accountSchema.validate(object)

  if (error) {
    callback(error, false)
  } else {    
    callback(null, true);
  }
}

const accountSchema = Joi.object().keys({
  
  banco: Joi.string().min(1).max(150).required(),
  agencia: Joi.string().min(1).max(45).required(),
  conta: Joi.string().min(1).max(45).required(),
  operacao: Joi.string().allow(null, '').max(45),
  pix: Joi.string().allow(null, '').max(500),

})

module.exports = { validationMiddleware, accountSchema }