"use strict";
const headerValidator = require('../../../middlewares/validator');
const errorMsg = require('../../../middlewares/locales');
const getHandle = require('./getallProfiles');
const getbyID = require('./getbyID');

module.exports= [

    ////get request for getting all profiles
    	/**
			* API NAME     : getallProfiles
			* Method       : GET
			* handler      : getHandler.handler,
			* Description  : This route is used to fetch all profiles in collection
			* header       : language,authorisation
	**/	
    {
        method: "GET",
        path: "/test/profile/gain",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            // auth:'simpleAuth',
            handler:  getHandle.handler,
            response: getHandle.responseCode,
            // validate: {
            //     headers: headerValidator.headerAuthValidator,
            //     failAction: (req, h, err) => {
            //         throw err
            //     }
            // }
        }
    },

    ////get request for getting user's own profile
    /**
			* API NAME     : getbyID
			* Method       : GET
			* handler      : getbyID.handler,
			* Description  : This route is used to fetch user's own profile in collection
			* header       : language,authorisation
	**/	
    {
        method: "GET",
        path: "/test/profile/gain/id",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            auth:'simpleAuth',
            handler:  getbyID.handler,
            validate: {
                headers: headerValidator.headerAuthValidator,
                failAction: (req, h, err) => {
                    throw err
                }
            }
        }
    }
]