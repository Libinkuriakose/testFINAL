'use strict';


const deleteData = require('./deleteData');
const getData = require('./getData.js');
const postData = require('./postData.js');
const putData = require('./putData.js');

module.exports = [].concat(
    deleteData,
    getData,
    postData,
    putData
);