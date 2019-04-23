// const Inert = require('inert');
// const Vision = require('vision');
// const HapiSwagger = require('hapi-swagger');
// const Pack = require('../../package');

// const swaggerOptions = {
//     info: {
//             title: 'Test API Documentation',
//             version: Pack.version,
//         },
//     };
// const swagger = [
//     Inert,
//     Vision,
//     {
//         plugin: HapiSwagger,
//         options: swaggerOptions
//     }
// ]

// module.exports=swagger;
"use strict";
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('../../package');


const swagger = {
        plugin: HapiSwagger,
        options: {
            info: {
                    title: 'Test API Documentation',
                    version: Pack.version,
                },
            }
}
module.exports=[

        Inert,
        Vision,
        swagger

]