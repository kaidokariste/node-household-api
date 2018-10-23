const url = require('url');

// Handler for HTTP GET all
exports.list = function (model, response) {
    model.find({}, function(error, result) {
        if (error) {
            console.error(error);
            return null;
        }
        if (response != null) {
            response.setHeader('content-type', 'application/json');
            response.send(JSON.stringify({data: result}));
        }
    });
}

// handler for Hello endpoint
exports.sayHello = function (req,res) {
    let get_params = url.parse(req.url, true).query;

    if (Object.keys(get_params).length == 0){
        res.send({'Response': 'Hello World!'});
    }
    else {
        res.send({'Response': 'Hello ' + get_params.user});
    }
}