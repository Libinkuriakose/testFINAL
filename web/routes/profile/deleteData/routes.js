
"use strict";
const headerValidator = require('../../../middlewares/validator');
const deleteHandle = require('./userDelete');
const errorMsg = require('../../../middlewares/locales');

module.exports= [

   

/////deleting user
/**
			* API NAME     : userDelete
			* Method       : DELETE
			* handler      : deleteHandle.handler,
			* Description  : This route is used to delete user profile
			* header       : language,authorisation
	**/	
    {
        method: "DELETE",
        path: "/test/profile/obliterate",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            auth:'simpleAuth',
            handler:  deleteHandle.handler,
            validate:{
                headers: headerValidator.headerAuthValidator,
                failAction: (req, h, err) => {
                    throw err
                }
            }
            
        }
       
    }
]