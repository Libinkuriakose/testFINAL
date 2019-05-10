"use strict";
const test = require('../../../../models/test')
const errorMsg = require('../../../middlewares/locales');
const joi = require('joi');
const elasticsearch = require('../../../../models/elasticSearch/methods')

///fetching profile of user who  is logged in
let handler = async (request, h) => {
    try{
    // const data= await test.getbyID(request._id);
    // let query = {"_id":request._id};
    const data= await elasticsearch.Select(request._id);
    return await !data ? h.response({message:request.i18n.__('userErrMsg')['405'],code:405}).code(405)
                       : h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:data}).code(200)
    }catch(err){
        return h.response(err.errmsg).code(err.status)
    }
};


        
module.exports={
    handler
}