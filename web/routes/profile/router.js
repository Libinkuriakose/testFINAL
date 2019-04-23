'use strict';


const deleteData = require('./deleteData');
const getData = require('./getData');
const postData = require('./postData');
const putData = require('./putData');

module.exports = [].concat(
    deleteData,
    getData,
    postData,
    putData
);