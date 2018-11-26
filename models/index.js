mongoose = require('mongoose')

citySchema = new mongoose.Schema({
    townName: String,
    currentPopulation: Number
});

userSchema = new mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
});

paymentSchema = new mongoose.Schema({
    address: {
        city: String,
        county: String,
        district: String,
        street: String,
        houseNumber: String,
        houseType: String
    },
    paymentDate:{
        year: String,
        month: String,
        season: String
    },
    paymentDetails:{
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

exports.City = mongoose.model('cities', citySchema);
exports.User = mongoose.model('users', userSchema);
exports.Payment = mongoose.model('payment', paymentSchema);