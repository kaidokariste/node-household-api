mongoose = require('mongoose')

citySchema = new mongoose.Schema({
    townName: String,
    currentPopulation: Number
});

exports.City = mongoose.model('cities', citySchema);