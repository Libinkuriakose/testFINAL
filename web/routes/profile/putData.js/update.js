"use strict";
const joi = require('joi');
const customer = require('../../models/sampleDBManage/customer');
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
    let result = await customer.findOneAndUpdate(queryData);
    return await result;
}

module.exports={
    handler,joiObject
}