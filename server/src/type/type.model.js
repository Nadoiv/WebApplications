var mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    Automobile: String,
    Image: String,
    Production: String
});

module.exports = mongoose.model('Type', TypeSchema);