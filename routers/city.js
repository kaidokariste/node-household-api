controller = require('../controllers'),
model = require('../models')

// Router for HTTP GET - "/cities"
exports.getCities = function (request, response) {
    controller.list(model.City, response);
}
