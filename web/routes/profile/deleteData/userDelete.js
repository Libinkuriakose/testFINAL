"use strict";
const test = require('../../../../models/test')
const ObjectID = require('mongodb').ObjectID;




/////deleting user profile
let handler = async (request, h) => {
    try{
    const query = {_id:new ObjectID(request._id)}
    const data= await test.obliterate(query);
    return await !data ? h.response({message:request.i18n.__('genericErrMsg')['500'],code:501}).code(501)
                       : h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:data}).code(200)
    }catch(err){
        return h.response(err.errmsg).code(err.status)
    }
};






module.exports={
    handler
}