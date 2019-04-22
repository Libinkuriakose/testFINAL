"use strict";
const headerValidator = require('../../../middlewares/validator');
const update = require('./update');

module.exports= [
    

    {
        method: "PUT",
        path: "/test/profile/edit",
        options:{
            tags: ['api', 'customer'],
            auth:'simpleAuth',
            handler:  update.handler,
            validate:{
                payload:update.joiObject,
                headers: headerValidator.headerAuthValidator,
                failAction: (req, reply, source, error) => {
                    return reply({ message: error.output.payload.message }).code(error.output.statusCode);
                }
            }
            
        }        
    }
]