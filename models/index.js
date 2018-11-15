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

exports.City = mongoose.model('cities', citySchema);
exports.User = mongoose.model('users', userSchema);