const express = require('express'),
    router = express.Router(),
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json'),
    routerBasic = require('./routers/basic'),
    http = require('http');


const app = express();

router.route('/hello')
    .get(routerBasic.getHelloMessage);

//In main route, show swagger documentation page
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

http.createServer(app).listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`));