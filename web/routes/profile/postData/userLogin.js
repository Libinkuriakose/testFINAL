
"use strict";
const joi = require('joi');
const test = require('../../../../models/test');
let token='';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const superSecret = 'isSecret';

const joiObject = joi.object({
    userName:joi.string().required().description('account name').error(new Error('UserNAme is missing')),
    password: joi.string().required().description('password').error(new Error('password is missing')),
    accessCode:joi.any().forbidden()
})

let handler = async (request, h) => {

    try{
    const user = await test.signin.getPassword(request.payload);
    const result= await !user  
                ? h.response({message:request.i18n.__('userErrMsg')['418'],code:418}).code(418)

                :await bcrypt.compare(request.payload.password,user.password) == false

                ?h.response({message:request.i18n.__('userErrMsg')['402'],code:402}).code(402)

                : await  test.signin.updateAccessCode(request.payload.userName);

        return  await result.hasOwnProperty('value')

                ?( token = await jwt.sign(_.pick(result.value,['userName','_id','accessCode']),superSecret,{expiresIn:'60d'}),

                token 
                ? h.response({message:request.i18n.__('genericErrMsg')['200'],code:200,data:token}).code(200)
                : h.response({message:request.i18n.__('userErrMsg')['406'],code:406}).code(406)
                )

                : result == null
                ? h.response({message:request.i18n.__('userErrMsg')['413'],code:413}).code(413)
                : result;
                         
    }catch (err) {
        return h.response(err.errmsg).code(err.status)
    }
}
     
  


module.exports={
    handler,joiObject
}