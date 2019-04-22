"use strict";
const signup = require('./signup');
const signin = require('./login');

module.exports= [
    

    {
        method: "POST",
        path: "/test/profile/signup",
        options:{
            tags: ['api', 'customer'],
            handler:  signup.handler,
            validate :{
                payload:signup.joiObject
            }
        }
    },


    {
        method: "POST",
        path: "/test/profile/login",
        options:{
            tags: ['api', 'customer'],
            handler:  signin.handler,
            validate:{
                payload:signin.joiObject
            }
        }
       
    }
]