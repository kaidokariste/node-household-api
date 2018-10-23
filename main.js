const express = require('express'),
    router = express.Router(),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    routerBasic = require('./routers/basic'),
    routerCity = require('./routers/city'),
    mongoose = require('mongoose'),
    http = require('http');

const app = express();


//Connection to mongo
mongoose.connect('mongodb://'+ process.env.MONGO_USERNAME +':'+ process.env.MONGO_PASSW + '@'+ process.env.MONGO_SERVER +':27035/'+ process.env.MONGO_DB +'', {useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', function () {
    console.log('MongoDB connection successful.');
});

router.route('/hello')
    .get(routerBasic.getHelloMessage);

router.route('/cities')
    .get(routerCity.getCities);

//In main route, show swagger documentation page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

http.createServer(app).listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));