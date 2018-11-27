controller = require('../controllers'),
    model = require('../models')

exports.postPayment = function (req, res) {
    const newPaymentObject = new model.Payment(req.body);
    newPaymentObject.save(err => {
        if (!err) {
            newPaymentObject.save();
            return res.status(201).send(newPaymentObject);
        } else {
            res.writeHead(500, {'Content-Type': 'application/json'});
            res.send({'error': 'Internal server error'});
        }
    });
}

