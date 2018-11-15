controller = require('../controllers'),
model = require('../models')

// Router for HTTP GET - "/cities"
exports.getCities = function (request, response) {
    controller.list(model.City, response);
}

// Router for HTTP GET - "/users"
exports.getUsers = function(req, res){
    controller.list(model.User, res);
}

// Router for HTTP GET - "/authenicate"
exports.getAuthenticationToken = function(req, res){
    controller.authenticate(model.User, req, res);
}