
"use strict";
const joi = require('joi');
const test = require('../../../../models/test')
const joiObject = joi.object({
    userName:joi.string().required().description('account name'),
    password: joi.string().required().description('password'),
    accessCode:joi.any().forbidden()
})


let handler = async (request, h) => {
    return await test.signin(request.payload);
}

module.exports={
    handler,joiObject
}