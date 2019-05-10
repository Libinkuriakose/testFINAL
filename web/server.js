const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
var fork = require('child_process').fork;
const logger = require('winston');


// For Node monitoring
// const monitx = require('Node-monitx');

if (cluster.isMaster) {
    console.log( `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` );
    logger.info(`Master ${process.pid} is running`);

    //To make booking and driver sync in Redis And Mongo
    const elasticSearch = require('../models/elasticSearch');
    const db = require('../models/mongodb');
    db.connect(() => {
        // if(!err){
        //     elasticSearch.connect((err,result) => {
        //         if(err){
        //             logger.error("elasticSearch connection ",err)
        //         }
        //     });
        // }else{
        //     logger.error("mongoDB connection ",err)
        // }
        logger.info(`master side DB  is running`);
    }); //create a connection to mongodb

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        logger.info(`Forking process number ${i}...`);
    }


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
    const Hapi = require( "hapi" );
    const authVal = require("./middlewares/authStrategy");
    const middleware = require('./middlewares/i18')
    const swagger = require('./middlewares/swagger')
    const elasticSearch = require('../models/elasticSearch');
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
        await elasticSearch.connect();

        console.log( `Server running at  http://localhost:${ port }` );
    } catch ( err ) {
        console.log( err );
        process.exit( 1 );
    }
}

start();
}
