
 'use strict'
require('dotenv').config();
const logger = require('winston');
const indexName = "datum_property";

var elasticsearch = require('elasticsearch');
exports.connect = async () => {
  try {
    var elasticClient =  new elasticsearch.Client({
      host: process.env.ELASTIC_SEARCH_URL,
      // log: 'trace'
    })
    console.log("==============>>>> elasticClient");
    var ping = await elasticClient.ping({requestTimeout:30000})
    console.log("==============>>>>ping", ping);
    var index_exists=await elasticClient.indices.exists({index:indexName})
    console.log("==============>>>>index",index_exists)



    module.exports={
  elastikClient:elasticClient
}

return "success";

  } catch (err) {
    throw err;
  }
}

