'use strict'
const tablename = 'testDoc';
const db = require('../mongodb')
const ObjectID = require('mongodb').ObjectID;//to convert stringId to mongodb's objectId
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const superSecret = 'isSecret';
let isMatch='';
// const errorMsg = require('../../web/middlewares/locales');
//{message:errorMsg.__('userErrMsg')['200'],code:200}
const signup = async (request) => {
      
    return new Promise((resolve, reject) => {
   
       db
        .get()
        .collection(tablename)
        .find({},(err,data)=>{
            console.log("@@@@@@@@@@",err,data);
            // console.log(request.i18n.__('userErrMsg')['200'],);
            err 
               ? reject() 
            //    : resolve({message:request.i18n.__('userErrMsg')['200'],code:200,data:data.toArray()});
            : resolve({message:data.toArray()});
        })
        
    });

}
const getAll = async (request) => {
      
    return new Promise((resolve, reject) => {
   
       db
        .get()
        .collection(tablename)
        .find({},(err,data)=>{
            console.log("@@@@@@@@@@",err,data);
            // console.log(request.i18n.__('userErrMsg')['200'],);
            err 
               ? reject() 
               : resolve({message:request.i18n.__('userErrMsg')['200'],code:200,data:data.toArray()});
        })
        
    });

}


//
const getbyID = (id) => {
    let condition = { _id: new ObjectID(id) };
    return new Promise((resolve, reject) => {
        db.get().collection(tablename)
            .findOne(condition, ((err, result) => {
                err ? reject(err) : resolve(result);
            }));
    });
}


// const signup = async (data) => {
//         return new Promise((resolve, reject) => {
       
//         //     db
//         //     .get()
//         //     .collection(tablename)
//         //     .insert(data,(err,data)=>{
//         //          err 
//         //             ? reject(err) 
//         //             : resolve(data);
//         //      })
//              console.log(db.get(),"*********")
//         db
//         .get().then((data)=>{
//             console.log(data,"%%%%%%");
//         })
//         // .collection(tablename)
//         // .insert(data,(err,data)=>{
//         //      err 
//         //         ? reject(err) 
//         //         : resolve(data);
//         //  })
         
//      });
// }


const signin = async (data)=>{
    let random = Math.floor(Math.random()*8999)+1000;
    let queryData = {
        query: { userName: data.userName },
        data: {
            $set:{accessCode:random.toString()}
        },
        options:{returnOriginal:false}
    }
    return new Promise((resolve,reject)=>{
        db
        .get()
        .collection(tablename)
        .findOne(queryData.query,async (err,user)=>{
            // console.log("ERR",err,"data",user);
            err
            ? 
             reject()
            :
            !user
            ? reject()
            :
             isMatch= await bcrypt.compare(data.password,user.password);
             isMatch ?
                    db
                    .get()
                    .collection(tablename)
                    .findOneAndUpdate(queryData.query,queryData.data,queryData.options,(err,data)=>{
                        console.log("err",err,"data",data);
                        err
                           ? reject()
                           : jwt.sign(_.pick(data.value,['userName','email','firstName','_id','accessCode']),superSecret,{expiresIn:'60d'},(err,token)=>{ 
                               console.log(token);
                               err
                                 ? reject("error when signing")
                                 : resolve(token);
                        })
                    })
                    :reject()
                
        });
    })
}

const findOneAndUpdate = async (queryObj) => {
    return new Promise((resolve, reject) => {
    db.get().collection(tablename)
        .findOneAndUpdate(queryObj.query, {$set:queryObj.data}, queryObj.options, (err, data) => {
            err 
            ? reject(err.toArray()) 
            : resolve(data);
        });    
        });
};








const obliterate = async (condition) => {
    return new Promise((resolve, reject) => {
    db.get().collection(tablename).findOneAndDelete(condition,(err, data)=> {
        err 
        ? reject() 
        : resolve(data);
    });
})
}





module.exports = {
    getbyID,
    signup,
    signin,
    getAll,
    obliterate,
    findOneAndUpdate
};
