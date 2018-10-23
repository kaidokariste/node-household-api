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