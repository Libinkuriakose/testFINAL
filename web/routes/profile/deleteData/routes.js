"use strict";
const headerValidator = require('../../../middlewares/validator');
const deleteHandle = require('./delete');
const errorMsg = require('../../../middlewares/locales');

module.exports= [

    {
        method: "DELETE",
        path: "/test/profile/obliterate",
        options:{
            tags: ['api', 'customer'],
            auth:'simpleAuth',
            handler:  deleteHandle.handler,
            validate:{
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
            
        }
       
    }
]