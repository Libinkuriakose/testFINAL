
const joi = require('joi');

const headerAuthValidator = joi.object({
    'authorization': joi.string().required().description("authorization code,Eg. Key").error(new Error('authorization is missing')),
    lan: joi.any().default('en').description("Language(English-en),Eg. en").example("en").error(new Error('lan is missing')),
}).options({ allowUnknown: true })

const headerLanValidator = joi.object({
    lan: joi.any().default('en').description("Language(English-en),Eg. en").example("en").error(new Error('lan is missing')),
}).options({ allowUnknown: true })

module.exports = { headerAuthValidator,headerLanValidator };