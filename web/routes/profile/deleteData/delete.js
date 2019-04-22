"use strict";
const customer = require('../../models/sampleDBManage/customer')
const ObjectID = require('mongodb').ObjectID;

let handler = async (request, h) => {
    const query = {_id:new ObjectID(request._id)}
    const data= await customer.obliterate(query);
    console.log("!!",request._id,"@@@");
    return await data;
};
module.exports={
    handler
}