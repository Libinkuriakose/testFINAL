'use strict'

const config = require('../../config');
const logger = require('winston');
const elasticsearch = require('elasticsearch');

let state = { db: null };

/**
 * Method to connect to the ElasticSearch
 * @param {*} url
 * @returns connection object
 */

exports.connect = (callback) => {

    if (state.db) return callback();

    var connection = new elasticsearch.Client({
        hosts: config.elasticSearch.url,
        log: "info"
    });
    logger.info(`ElasticSearch connected successfully -------------`);
    state.db = connection;
    return callback();
}

/**
 * Method to get the connection object of the ElasticSearch
 * @returns db object
 */
exports.get = () => { return state.db }

/**
 * Index to be used for Elastic Search
 */
exports.indexName = config.elasticSearch.index;
