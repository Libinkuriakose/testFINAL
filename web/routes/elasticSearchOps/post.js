"use strict";
const test = require('../../../../models/test');
const joi = require('joi');
const bcrypt = require('bcrypt');

const joiObject = joi.object({
    userName:joi.string().required().description("account name").error(new Error('UserNAme is missing')),
    firstName: joi.string().required().description('first name').error(new Error('firstName is missing')),
    lastName: joi.string().allow('').description('last name').error(new Error('lastName is missing')),
    email: joi.string().email().required().description('email').error(new Error('Email is missing or incorrect')),
    password: joi.string().required().description('password').error(new Error('password is missing')),
    phone: joi.string().required().description('mobile').error(new Error('phone number is missing')),
    accessCode: joi.string().forbidden().default('0')
})


//signing up
let handler = async (request, h) => {
//     try{
//     const hashPassword = async ()=>{
//         let salt = await bcrypt.genSalt(10);
//         return await bcrypt.hash(request.payload.password, salt);
//     }
//     request.payload.password=await hashPassword();

//     let result = await test.signup(request.payload);

//     return await result == false 
//                              ? h.response({message:request.i18n.__('userErrMsg')['419'],code:419}).code(419)
//                              : h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:result}).code(200)
// }catch(err){
//     return h.response(err.errmsg).code(err.status)
// }

console.log("#################");




}


module.exports={
    handler,joiObject
}