var mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    Automobile: String,
    Image: String,
    Production: Number
});

module.exports = mongoose.model('Type', TypeSchema);