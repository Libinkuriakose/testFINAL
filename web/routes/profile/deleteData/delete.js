"use strict";
const test = require('../../../../models/test')
const ObjectID = require('mongodb').ObjectID;

let handler = async (request, h) => {
    const query = {_id:new ObjectID(request._id)}
    const data= await test.obliterate(query);
    console.log("!!",request._id,"@@@");
    return await data;
};
module.exports={
    handler
}