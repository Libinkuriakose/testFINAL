"use strict";
const test = require('../../../../models/test')

let handler = async (request, h) => {
    console.log(request._id);
    const data= await test.getbyID(request._id);
    return await data;
};

        
module.exports={
    handler
}