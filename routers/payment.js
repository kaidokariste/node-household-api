controller = require('../controllers'),
    model = require('../models')

exports.postPayment = function (req, res) {
    const newPaymentObject = new model.Payment(req.body);
    newPaymentObject.save(err => {
        if (err) return res.status(500).send(err);
        return res.status(200).send(newPaymentObject);
    });
}

