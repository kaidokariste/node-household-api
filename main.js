const
    express = require('express'),
    config = require('./configure'),
    router = express.Router(),
    apiRouter = require('./routers'),
    mongoose = require('mongoose'),
    http = require('http'),
    jwt = require('jsonwebtoken') //used to create, sign and verify tokens
    app = express();


//==================
//Configuration
//==================
// Connect to MongoDB using promises
mongoose.connect('mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSW + '@' + process.env.MONGO_SERVER + ':27035/' + process.env.MONGO_DB + '', {useNewUrlParser: true})
    .then(()=> console.log('MongoDB connection successful.'))
    .catch( err => console.error('Connection failed', err));

app = config(app);
app.use('/api/v1', router);

//=================
//Routing
//=================

// TODO: route to authenticate a user (POST http://localhost:8080/api/authenticate)
router.route('/authenticate')
    .post(apiRouter.Basic.getAuthenticationToken);

router.route('/hello')
    .get(apiRouter.Basic.getHelloMessage);

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
        // if there is no token return an HTTP 403 - Forbidden
        return res.status(403).send({ success: false, message: 'No token provided.'});
    }
});


router.route('/users')
    .get(apiRouter.Basic.getUsers);

router.route('/cities')
    .get(apiRouter.City.getCities);

router.route('/payments')
    .post(apiRouter.Payment.postPayment)
    .delete(apiRouter.Payment.deletePayment);

router.route('/cities/:townName')
    .delete(apiRouter.City.deleteCity);

//Create server
http.createServer(app).listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));