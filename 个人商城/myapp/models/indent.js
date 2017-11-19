var mongoose  = require('mongoose');
const db = require('./db');
var Schema = mongoose.Schema;
var indentSchema = new Schema({
    "indentId":String,
    "indentName":String,
    "salePrice":Number,
    "describe":String,
    "indentNum":Number,
    "indentImage":String,
    "time":String,
    "userName":String
});
module.exports = mongoose.model('indent',indentSchema);