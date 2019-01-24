const
    express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger.json');

module.exports = function (app) {
    // use morgan to log requests to the console
    app.use(morgan('dev'));
    // use body parser so we can get info from POST and/or URL parameters
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    // define how to use and how to serve swagger
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    return app;
}