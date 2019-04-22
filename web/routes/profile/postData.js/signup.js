"use strict";
const customer = require('../../models/sampleDBManage/customer');
const joi = require('joi');
const bcrypt = require('bcrypt');

const joiObject = joi.object({
    userName:joi.string().required().description('account name'),
    firstName: joi.string().required().description('first name'),
    lastName: joi.string().allow('').description('last name'),
    email: joi.string().email().required().description('email').error(new Error('Email is missing or incorrect')),
    password: joi.string().required().description('password'),
    phone: joi.string().required().description('mobile'),
    accessCode: joi.string().forbidden().default('0')
})



let handler = async (request, h) => {
    const hashPassword = async ()=>{
        let salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(request.payload.password, salt);   
    }
    request.payload.password=await hashPassword();
    let result = await customer.signup(request.payload);
    return await result;
}

module.exports={
    handler,joiObject
}