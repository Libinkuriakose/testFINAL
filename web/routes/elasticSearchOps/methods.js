'use strict'
const logger = require('winston');
const elasticClient = require('../elasticSearch');
const tablename = 'userList';
const indexName = "datum_property";
const version = 382;

function Select(data, callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: {
            "query": {
                "match": data
            }
        }
    }, function (err, result) {
        callback(err, result);
    });
}
function SelectByAddress(data, callback) {
    
    let condition = {
        "query": {
            "multi_match" : {
              "query":    data,
              "fields": [ "agentDetail.streetName", "agentDetail.streetDirection", "agentDetail.streetSuffix", "agentDetail.city", "agentDetail.zip" ] 
            }
          }
       
        }    
    logger.silly("condition : ", JSON.stringify(condition))
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: condition
    }, function (err, result) {    
        callback(err, result);
    });
}


function SelectAll(callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: {
            from: 0, size: 200,
            "query": {
                "match_all": {}
            }
        }
    }, function (err, result) {
        callback(err, result);
    });
}

function CustomeSelect(data, callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        body: data
    }, function (err, result) {
        callback(err, result);
    });
}
function Insert(data, callback) {

    let _id = data._id.toString();
    delete data._id;
    elasticClient.get().index({
        index: indexName,
        type: tablename,
        id: _id,
        body: data
    }, (err, result) => {
        callback(err, result);
    });
}

function UpdateWithPush(_id, field, value, callback) {


    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            "script": "ctx._source." + field + ".add('" + value + "')"
        }

    }, (err, results) => {
        callback(err, results)
    })
}

function UpdateWithPull(_id, field, value, callback) {

    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            "script": "ctx._source." + field + ".remove(ctx._source." + field + ".indexOf('" + value + "'))"
        }
    }, (err, results) => {
        callback(err, results);
    })
}

function Update(_id, data, callback) {

    elasticClient.get().update({
        index: indexName,
        type: tablename,
        id: _id,
        retry_on_conflict: 5,
        body: {
            doc: data,
            doc_as_upsert: true
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function updateByQuery(condition, fieldName, fieldValue, callback) {
    elasticClient.get().updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            query: { "match": condition },
            "script": { "source": `ctx._source.${fieldName}=${fieldValue}` }
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function updateByQuery(condition, fieldName, fieldValue, callback) {
    elasticClient.get().updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            query: { "match": condition },
            "script": { "source": `ctx._source.${fieldName}=${fieldValue}` }
        }
    }, (err, results) => {
        callback(err, results)
    })
}
function removeField(_id, fieldName, callback) {
    elasticClient.get().updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            "script": `ctx._source.remove("${fieldName}")`,
            "query": {
                "bool": {
                    "must": [
                        {
                            "exists": {
                                "field": `${fieldName}`
                            }
                        }
                    ]
                }
            }
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function setOffline(timestamp, callback) {
    elasticClient.get().updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {
            query: {
                "range": {
                    "lastOnline": {
                        "lt": timestamp
                    }
                },
                // "match":{"onlineStatus":1}
            },
            "script": { "source": "ctx._source.onlineStatus=0" }
        }
    }, (err, results) => {
        callback(err, results)
    })
}

function Delete(tablename, condition, callback) {
    elasticClient.get().deleteByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: {

            query: {
                match: condition
            }
        }
    }, (err, results) => {
        callback(err, results)
    })
}
function Bulk(dataInArray, callback) {
    elasticClient.get().bulk({
        body: dataInArray
    }, (err, results) => {
        callback(err, results)
    })
}
function updateByQueryWithArray(condition, callback) {
    elasticClient.updateByQuery({
        index: indexName,
        type: tablename,
        version: version,
        body: condition
    }, (err, results) => {
        callback(err, results)
    })
}

module.exports = {
    updateByQueryWithArray, setOffline, Bulk, removeField,
    CustomeSelect, Select, Insert, Update, updateByQuery, Delete,
    UpdateWithPush, UpdateWithPull, SelectAll, SelectByAddress
};