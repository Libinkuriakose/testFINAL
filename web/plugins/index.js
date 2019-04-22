
//////added syntax to use custom plugin 
"use strict";

const Blipp = require( "blipp" );
const HapiPino = require( "hapi-pino" );
const customPlugin = require( "./customPlugin" );
const jwt = require("./jwt");

const isDev = process.env.NODE_ENV !== "production";

module.exports.register = async server => {
    await server.register( [ Blipp, {
        plugin: HapiPino,
        options: {
            prettyPrint: isDev,
            logEvents: [ "response" ]
        }
    }, {
        plugin: customPlugin,
        options: {
            message: `My hapi server is running at ${ server.info.uri }`
        }
    } ] );
};
