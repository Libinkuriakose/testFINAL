"use strict";
const test = require('../../../../models/test')
const elasticsearch = require('../../../../models/elasticSearch/methods')

/////fetching all user documents
let handler = async (request, h) => {
    try{
    // const data= await test.getAll();
    const data= await elasticsearch.SelectAll();
    return await !data ? h.response({message:request.i18n.__('userErrMsg')['405'],code:405}).code(405)
                       : h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:data}).code(200)
    }catch(err){
        return h.response(err.errmsg)
        // .code(err.status)
    }

};


        
module.exports={
    handler
}