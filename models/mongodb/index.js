'use strict'

const url = 'mongodb://localhost:27017/sampleHapiApp';
const mongodb = require('mongodb');
const logger = require('winston');
// const MongoClient = mongodb.MongoClient;
let state = { db: null };

/**
 * Method to connect to the mongodb
 * @param {*} url
 * @returns connection object
 */

exports.connect = (callback) => {

    if (state.db) return callback();

    mongodb.connect(url, (err, connection) => {
        if (err) {
            logger.error(`MongoDB error connecting to ${url}`, err.message);

        }
        state.db = connection;//assign the connection object

        logger.info(`MongoDB connected successfully -------------`);
        //console.log('connected',connection);
        return 'success';
    })
}

/**
 * Method to get the connection object of the mongodb
 * @returns db object
 */
exports.get = () => { return state.db }

/**
 * Method to close the mongodb connection
 */
exports.close = (callback) => {

    if (state.db) {
        state.db.close((err, result) => {
            state.db = null;
            state.mode = null;
            return callback(err);
        })
    }
}