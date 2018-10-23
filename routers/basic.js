controller = require('../controllers')

/*
exports.getHelloMessage = function(req,res){
    res.send({'Response':'Hello World!'});
}*/

exports.getHelloMessage = function(req,res) {
    controller.sayHello(req, res);
}