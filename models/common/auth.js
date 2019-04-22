'use strict'
const tablename = 'customer';
const db = require('../mongodb')
const _ = require('lodash');
const codeCheck = async (userName,accessCode)=>{

    const condition = {
        userName:userName,
        accessCode:accessCode
    }
    return new Promise((resolve, reject) => {
    db.get().collection(tablename).findOne(condition,(err,result)=>{
        err 
          ? reject()
          : result
                    ? resolve('success')
                    : reject()
    })
});
}
module.exports={
    codeCheck
}