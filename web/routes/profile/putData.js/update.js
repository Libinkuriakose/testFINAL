"use strict";
const joi = require('joi');
const test = require('../../../../models/test')
const ObjectID = require('mongodb').ObjectID;

const joiObject = joi.object({
    userName:joi.string().required().description('account name'),
    firstName: joi.string().required().description('first name'),
    lastName: joi.string().allow('').description('last name'),
    email: joi.string().email().required().description('email').error(new Error('Email is missing or incorrect')),
    password: joi.string().required().description('password'),
    phone: joi.string().required().description('mobile'),
})

let handler = async (request, h) => {

    var queryData = {
        query: { _id: new ObjectID(request._id) },
        // data: {
        //     $set:request.payload
        // },
        data:request.payload,
        options:{returnOriginal:false}
    }
    let result = await test.findOneAndUpdate(queryData);
    return await result;
}

module.exports={
    handler,joiObject
}