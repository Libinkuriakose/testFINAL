"use strict";
const test = require('../../../../models/test')
let handler = async (request, h) => {
    const data= await test.getAll(request);
    return await data;
};


        
module.exports={
    handler
}