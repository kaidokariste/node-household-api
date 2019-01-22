const express = require('express'),
    router = express.Router(),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    routerBasic = require('./routers/basic'),
    routerCity = require('./routers/city'),
    routerPayment = require('./routers/payment'),
    mongoose = require('mongoose'),
    http = require('http'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'); //used to create, sign and verify tokens


const app = express();

//==================
//Configuration
//==================
// Connect to MongoDB using promises
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSW + '@' + process.env.MONGO_SERVER + ':27035/' + process.env.MONGO_DB + '', {useNewUrlParser: true})
    .then(()=> console.log('MongoDB connection successful.'))
    .catch( err => console.error('Connection failed', err));


// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// use morgan to log requests to the console
app.use(morgan('dev'));

//=================
//Routing
//=================

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/authenticate')
    .post(routerBasic.getAuthenticationToken);

router.route('/hello')
    .get(routerBasic.getHelloMessage);

//route middleware to verify a token
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    //decode token
    if (token) {

        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        //verifies secret and checks exp
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});


router.route('/users')
    .get(routerBasic.getUsers);

router.route('/cities')
    .get(routerCity.getCities);

router.route('/payments')
    .post(routerPayment.postPayment);

router.route('/cities/:townCode')
    .delete(routerCity.deleteCity);

//In main route, show swagger documentation page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

http.createServer(app).listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));