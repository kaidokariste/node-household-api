const express = require('express')
    , router = express.Router()
    , swaggerUi = require('swagger-ui-express')
    , swaggerDocument = require('./swagger.json')
    , url = require('url')
    , http = require('http')
    , path = require('path');

const port = 3000;
const app = express();

app.get('/api/v1/hello', (req, res) => res.send({'Response':'Hello World!'}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', router);

http.createServer(app).listen(port, () => console.log(`Example app listening on port ${port}!`));