const Joi = require('joi');

const registrationDefinition = {
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().length(6).regex(/^\d+$/).required().messages({
        'string.pattern.base': 'Password must contain only numbers',
    })
}

const loginDefinition = {
    email: Joi.string().required(),
    password: Joi.string().required()
}

const registrationSchema = Joi.compile(registrationDefinition);
const loginSchema = Joi.compile(loginDefinition);

module.exports = {
    registrationSchema,
    loginSchema
}