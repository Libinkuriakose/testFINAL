"use strict";
const customer = require('../../models/sampleDBManage/customer')
let handler = async (request, h) => {
    const data= await customer.getAll(request);
    return await data;
};


        
module.exports={
    handler
}