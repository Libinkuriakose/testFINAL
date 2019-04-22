"use strict";
const customer = require('../../models/sampleDBManage/customer')

let handler = async (request, h) => {
    console.log(request._id);
    const data= await customer.getbyID(request._id);
    return await data;
};

        
module.exports={
    handler
}