'use strict'
const tablename = 'customer';
const db = require('../mongodb')
const ObjectID = require('mongodb').ObjectID;//to convert stringId to mongodb's objectId


////fetching all data
/**
 * 
 * @param {*} request 
 */
const getAll = async (request) => {
   
       return await db.get().collection(tablename).find({}).toArray()

}

////// fetching single document by the id
/**
 * 
 * @param {*} id 
 */
const getbyID = async (id) => {
    let condition = { _id: new ObjectID(id) };
    return await db.get().collection(tablename).findOne(condition)
}

////// inserting new profile
/**
 * 
 * @param {*} data 
 */
const signup = async (data) => {
    const doc = await db.get().collection(tablename).find({userName:data.userName}).toArray();
        return doc.length !=0 
                            ? false
                            : (await db.get().collection(tablename).insert(data))
}

////login
/**
 * 
 */
const signin = {
    /**
     * @param {*} payload
     */
    getPassword : async (payload)=>{
        let query = { userName: payload.userName }
        const data = await db.get().collection(tablename).findOne(query);
        return data;
    },
/**
 * 
 * @param {*} userName 
 * 
 */
    updateAccessCode : async (userName) =>{
        const accessCode=Math.floor(Math.random()*8999)+1000
        const queryData = {
                query: { userName: userName },
                data: { $set:{accessCode:accessCode.toString()} },
                options:{returnOriginal:false}
                }
        return await db.get().collection(tablename).findOneAndUpdate(queryData.query,queryData.data,queryData.options)
        
    }

}

///// updating single document
const findOneAndUpdate = async (dataObj) => {

    const userName =async (userName)=>{
       const userdata= await db.get().collection(tablename).find(userName).toArray()
       return userdata.length;
    }

    const result = async (dataObj)=>{
        return await db.get().collection(tablename).findOneAndUpdate(dataObj.query,dataObj.data, dataObj.options);
    }

     return await !dataObj.isChanged ? await result(dataObj) 
                                     : await userName(dataObj.userName) == 0 ? await result(dataObj) : false;
}




const obliterate = async (condition) => {
    return await db.get().collection(tablename).findOneAndDelete(condition)
}





module.exports = {
    getbyID,
    signup,
    signin,
    getAll,
    obliterate,
    findOneAndUpdate
};
