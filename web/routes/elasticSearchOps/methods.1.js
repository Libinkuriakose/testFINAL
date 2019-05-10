'use strict'
const logger = require('winston');
const elasticClient = require('../elasticSearch');
const tablename = 'sceneList';
const indexName = "datumproperty";
const version = 382;

function findMatch(data, callback) {
    let condition = {
        "from": data.skip, "size": data.limit,
        "query": {
            "bool": {
                "must": [
                    {
                        "match": {
                            "location": {
                                "lat": data.latitude,
                                "lon": data.longitude
                            }
                        }
                    }

                ]
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
function searchscenes(condition, callback) {
    elasticClient.get().search({
        index: indexName,
        type: tablename,
        "_source" : {"enabled" : false},
         "_source":["price","currency","productFeatures","productDescription","sceneStatusText","location"],
        // "_source": {
        //     includes: ["tagId","tagSubtypeId"],
        //     excludes: ["productDescription.*"]
        // },
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
    let _id = "" + data._id;
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
                }
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
function DeleteById(data, callback) {

    elasticClient.get().deleteByQuery({
        index: indexName,
        type: tablename,
        body: {
            query: {
                terms: {
                    _id: data
                }
            }
        }
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
    updateByQueryWithArray, setOffline,
    CustomeSelect, searchscenes, Insert, Update, updateByQuery, Delete, findMatch,
    UpdateWithPush, UpdateWithPull, SelectAll, DeleteById
};