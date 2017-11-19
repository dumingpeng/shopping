var mongoose  = require('mongoose');
const db = require('./db');
var Schema = mongoose.Schema;
var evaluateSchema = new Schema({
	//商品id
    "evaluateId":String,
    //姓名
    "userName":
    {
    	type:String,
        ref:'User'
    },
    //内容
    "evaluateContent":String,
    "time":Object,
    //管理员姓名
    "admName":String,
    "score":Number
});
module.exports = mongoose.model('evaluate',evaluateSchema);