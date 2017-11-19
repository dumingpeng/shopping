var  mongoose  = require('mongoose');
const db = require('./db');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	uname:String,
	password:String
})

module.exports = mongoose.model("Adm",userSchema);
