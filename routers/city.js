controller = require('../controllers'),
model = require('../models')

// Router for HTTP GET - "/cities"
exports.getCities = function (request, response) {
    let propertyValue = request.params.townCode;
    if(!propertyValue){
       controller.list(model.City, response);
    }
}


// Router for HTTP DELETE - "/cities/:townName"
exports.deleteCity = function(req, res){
    let propertyValue = req.params.townName;
    let searchObject = {townName : propertyValue}
    controller.delete(model.City, searchObject, req, res);
}