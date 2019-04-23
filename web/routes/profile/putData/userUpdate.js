"use strict";
const joi = require('joi');
const test = require('../../../../models/test');
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

const joiObject = joi.object({
    userName:joi.string().required().description('account name').error(new Error('UserNAme is missing')),
    firstName: joi.string().required().description('first name').error(new Error('firstName is missing')),
    lastName: joi.string().allow('').description('last name'),
    email: joi.string().email().required().description('email').error(new Error('Email is missing or incorrect')),
    password: joi.forbidden().description('password').error(new Error('password is forbidden')),
    phone: joi.string().required().description('mobile').error(new Error('phone is missing')),
    accessCode:joi.string().forbidden().description('accessCode').error(new Error('accessCode is forbidden'))
})

////updating user's own profile
let handler = async (request, h) => {
    try{
    let queryObj = {
            query: { _id: new ObjectID(request._id) },
            userName: { userName :request.payload.userName },
            data:{$set:request.payload},
            options:{returnOriginal:false}
        }
    queryObj.isChanged = (request.payload.userName == request.userName )? false: true;

    let result = await test.findOneAndUpdate(queryObj);
    return await result.hasOwnProperty('value') 
                             ? h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:result}).code(200)
                             : result != false
                             ? h.response({message:request.i18n.__('userErrMsg')['413'],code:413}).code(413)
                             : h.response({message:request.i18n.__('userErrMsg')['419'],code:419}).code(419)


    }catch(err){
        return h.response(err.errmsg).code(err.status)
    }
}

module.exports={
    handler,joiObject
}