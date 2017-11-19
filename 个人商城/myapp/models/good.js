var mongoose  = require('mongoose');
const db = require('./db');
var Schema = mongoose.Schema;
var produtSchema = new Schema({
    "productId":String,
    "productName":String,
    "salePrice":Number,
    "checked":Boolean,
    "describe":String,
    "classify":String,
    "productNum":Number,
    "productImage":String,
    "time":Object,
    "buyNum":Number
});
module.exports = mongoose.model('Good',produtSchema);