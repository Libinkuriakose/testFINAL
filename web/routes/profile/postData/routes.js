
"use strict";
const signin = require('./userLogin');
const errorMsg = require('../../../middlewares/locales');
const signup = require('./userSignup');

module.exports= [

        ///post request for signing in
    /**
			* API NAME     : userLogin
			* Method       : POST
			* handler      : signin.handler,
			* Description  : This route is used to login users

	**/	
    {
        method: "POST",
        path: "/test/profile/login",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            handler:  signin.handler,
            validate:{
                payload:signin.joiObject,
                failAction: (req, h, err) => {
                    throw err
                }
            }
        }
       
    },
    
        ///post request for signup
    /**
			* API NAME     : userSignup
			* Method       : POST
			* handler      : signup.handler,
			* Description  : This route is used for new user signup

	**/	
    {
        method: "POST",
        path: "/test/profile/signup",
        options:{
            tags: ['api', 'customer'],
            description: errorMsg['genericErrMsg']['userErrMsg'],
            notes: errorMsg['genericErrMsg']['userErrMsg'],
            handler:  signup.handler,
            validate :{
                payload:signup.joiObject,
                failAction: (request, h, err) => {
                    throw  err
                }
            }
        }
    }

]

