const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var fork = require('child_process').fork;
const logger = require('winston');
const express = require('express');
const trace = require("node-trace")


// For Node monitoring
// const monitx = require('Node-monitx');

if (cluster.isMaster) {

    logger.info(`Master ${process.pid} is running`);

    //To make booking and driver sync in Redis And Mongo
    const db = require('../models/mongodb');
    db.connect(() => {
        // const syncBookingsAndDrivers = require('./commonModels/syncBookingsAndDrivers');
        // syncBookingsAndDrivers.syncDrivers(() => {});
        // syncBookingsAndDrivers.syncBookings(() => {});
        logger.info(`master side DB  is running`);
    }); //create a connection to mongodb

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        logger.info(`Forking process number ${i}...`);
    }

    //for Redis Event
    // const redisEvent = require('../redisEventListner');

    //*******Node-Monitx code***************
    // var metricsServer = express();
    // metricsServer.listen(3002, () => {});
    // metricsServer.use('', trace.MetricsCluster(metricsServer, express));
    // metricsServer.use('', trace.SnapshotExpress(metricsServer, express));
    //*******Node-Monitx code***************

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        logger.info(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
    const psList = require('ps-list');
    psList().then(data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name == "node") {
                let str = data[i].cmd;
                if (data[i].cmd.match(/worker/g)) {
                    logger.warn('Old workers removing in progress: ' + JSON.stringify(data[i].cmd));
                    process.kill(data[i].pid);
                }
            }
        }
    });
} else {
    // const Hapi = require('hapi');
    // const Server = new Hapi.Server();
    // const logger = require('winston');
    // const config = require('../config');
    // const db = require('../models/mongodb');
    // const turfLibrary = require('../library/turf');
    // // const mqtt = require('../library/mqtt');
    // const elasticSearch = require('../library/elasticSearch');
    // // const redis = require('../library/redis');
    // const middleware = require('./middleware');
    // // const Auth = require('./middleware/authentication.js');
    // const amqpConn = require('../library/rabbitMq');
    // const rabbitMqWorker = require('../library/rabbitMq/worker');
    // const trace_endpoint = require('node-trace').Endpoint;
    // // const monitx = require('Node-monitx').Endpoint;

    // Server.connection({
    //     port: config.server.port,
    //     host: '0.0.0.0',
    //     routes: {
    //         cors: {
    //             origin: ['*'],
    //             additionalHeaders: ['lan']
    //         }
    //     }
    // });

    // /* +_+_+_+_+_+_+_+_+_+_+ Plugins / Middlewares +_+_+_+_+_+_+_+_+_+_+ */

    // Server.register(
    //     [
    //         middleware.good,
    //         middleware.swagger.inert,
    //         middleware.swagger.vision,
    //         middleware.swagger.swagger,
    //         middleware.auth.HAPI_AUTH_JWT,
    //         middleware.localization.i18n
    //     ],
    //     function (err) {
    //         if (err)
    //             Server.log(['error'], 'Hapi Plugins load error: ' + err)
    //         else
    //             Server.log(['start'], 'Hapi Plugins loaded')
    //     });

    // Server.auth.strategy('providerJWT', 'jwt', middleware.auth.providerJwt);
    // Server.auth.strategy('slaveJWT', 'jwt', middleware.auth.slaveJwt);
    // Server.auth.strategy('dispatcherJWT', 'jwt', middleware.auth.dispatcherJwt);
    // Server.auth.strategy('adminJwt', 'jwt', middleware.auth.adminJwt);
    // Server.auth.strategy('operatorJWT', 'jwt', middleware.auth.operatorJWT);
    // Server.auth.strategy('brokerJWT', 'jwt', middleware.auth.brokerJWT);

    // Server.route(require('./router')); //import the routes
    // Server.route(require('../library/twilio/webhook'));
    // Server.route(require('../library/mailgun/webhook'));

    // Server.on('response', (req) => {
    //     // logger.info("req.payload : ", JSON.stringify(req.payload));
    //     // logger.info(req.headers.authorization);
    //             logger.info(`server on`);
    //         //logger.info("response for api : ", req.route.path, " : ", JSON.stringify(req.response.source));
    //     //     // let reqTime = req.info.responded - req.info.received;
    //     // trace_endpoint.onComplete(req.info.received, req.route.method.toUpperCase(), req.route.path, req.response.statusCode)
    // });

    // // const initialize = () => {
    // Server.start(() => {
    //     logger.info(`Server is listening on port ${Server.info.uri} and cpuid : ${cluster.worker.id}`)
    //     db.connect(() => {
    //         turfLibrary.readOperationZone(() => {});
    //         turfLibrary.readCityZone(() => {});
    //         turfLibrary.readAreaZone(() => {});
    //     }); //create a connection to mongodb
    //     elasticSearch.connect(() => {}); //create a connection of elastic search
    //     amqpConn.connect(() => {});
    //     rabbitMqWorker.startWorker();
    // });

    // //do something when app is closing
    // process.on('exit', function (code, signal) {
    //     logger.error(`exit main process exited with code ${code} and signal ${signal}`);
    //     rabbitMqWorker.exitHandler();
    // });

    // //catches ctrl+c event
    // process.on('SIGINT', function (code, signal) {
    //     logger.error(`SIGINT main process exited with code ${code} and signal ${signal}`);
    //     rabbitMqWorker.exitHandler();
    // });

    // //catches uncaught exceptions
    // process.on('uncaughtException', function (err, code, signal) {
    //     logger.error(`uncaughtException ${err} main process exited with code ${code} and signal ${signal}`);
    //     rabbitMqWorker.exitHandler();
    // });
const Hapi = require( "hapi" );
const authVal = require("./middlewares/authStrategy");
const middleware = require('./middlewares/i18')
const swagger = require('./middlewares/swagger')

const db = require('../models/mongodb');
const port = 3004;
const config = { port };

const start = async () => {
    try {

        const server = Hapi.server( config );

        await server.register(require('hapi-auth-jwt2'));
        await server.register(swagger);

        await server.register(middleware.i18n)
        server.auth.strategy('simpleAuth', 'jwt',authVal.sampleAuth);
    
        await server.route(require('./routes')); //import the routes
    


        // start the server
        await server.start();
        await db.connect();

        console.log( `Server running at  http://localhost:${ port }` );
    } catch ( err ) {
        console.log( err );
        process.exit( 1 );
    }
}

start();
}
