"use strict";
const headerValidator = require('../../../middlewares/validator');
const getHandle = require('./get');
const getbyID = require('./getbyID');
const errorMsg = require('../../../middlewares/locales');

module.exports= [
    {
        method: "GET",
        path: "/test/profile/gain",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            auth:'simpleAuth',
            handler:  getHandle.handler,
            validate: {
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    },
    {
        method: "GET",
        path: "/test/profile/gain/id",
        options:{
            tags: ['api', 'customer'],
            auth:'simpleAuth',
            handler:  getbyID.handler,
            validate: {
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
        }
    }

    
]