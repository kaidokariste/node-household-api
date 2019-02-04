//======================================================
// Mongoose schema datatypes:
// String, Number, Date(date and time object), Buffer, Boolean (true/false), Mixed (unstructured),
// ObjectID (when you want to store another object id), Array
//======================================================

mongoose = require('mongoose')

citySchema = new mongoose.Schema({
    townName: String,
    currentPopulation: Number
}, {
    toJSON: {virtuals: true},
    id: false
});

userSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean,
    dateCreated: {type: Date, default: Date.now()}
});

paymentSchema = new mongoose.Schema({
    address: {
        town: {type: String, required: true},
        county: {type: String, required: true},
        district: String,
        street: String,
        houseNumber: String,
        houseType: {type: String, required: true}
    },
    paymentDate: {
        year: {type: String, required: true},
        month: {type: String, required: true},
        season: {type: String, required: true},
    },
    paymentDetails: {
        centralHeating: Number,
        waterHeating: Number,
        waterConsumption: Number,
        gas: Number,
        garbageCollection: Number,
        overallElectricity: Number,
        renovationFund: Number,
        administrationFee: Number,
        loanMonthlyPayment: Number,
        insurance: Number,
        janitor: Number,
        total: Number
    }
});

//Example of virtual property. We compose townCode based on the townName
citySchema.virtual('townCode')
    .get(function () {
            switch (this.townName) {
                case 'Tartu':
                    return 'TRT';
                    break;
                case 'Tallinn':
                    return 'TLL';
                    break;
                default:
                    return null;
            }
        }
    );

// The first argument is the singular name of the collection in MongoDB your model is for
exports.City = mongoose.model('cities', citySchema);
exports.User = mongoose.model('users', userSchema);
exports.Payment = mongoose.model('payment', paymentSchema);