controller = require('../controllers')

exports.getHelloMessage = function(req,res) {
    controller.sayHello(req, res);
}

// Router for HTTP GET - "/users"
exports.getUsers = function(req, res){
    controller.list(model.User, res);
}


// Router for HTTP GET - "/authenicate"
exports.getAuthenticationToken = function(req, res){
    controller.authenticate(model.User, req, res);
}