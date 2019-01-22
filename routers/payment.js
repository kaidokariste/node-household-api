controller = require('../controllers'),
    model = require('../models')

function postPayment(req, res) {
    const newPaymentObject = new model.Payment(req.body);
    newPaymentObject.save(err => {
        if (!err) {
            newPaymentObject.save();
            return res.status(201).send(newPaymentObject);
        } else {
            /*
            * Handling Mongoose schema validation errors.
            * required: true in model equals ValidatorError in error message
            */
            var errMessage = '';
            for (var errName in err.errors) {
                 switch(err.errors[errName].name){
                     case 'ValidatorError':
                         errMessage = errMessage +' '+ err.errors[errName].message;
                 }
            }
            res.set('Content-Type','application/json');
            // HTTP - 412 Preconditions failed
            return res.status(412).send({'success':false, 'error': errMessage});
        }
    });
}

module.exports.postPayment = postPayment;