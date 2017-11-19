const express = require('express');
const router = express.Router();
const User = require('../models/users');
const validator = require('validator');
const crypto = require('crypto');
const Good = require('../models/good');
const multer = require('multer');
const Indent = require('../models/indent');
const Evaluate = require('../models/evaluate')

//订单获取
router.post('/gainShop',function(req,res){
	var id = req.cookies.username;
//	console.log(id);
	User.findOne({'_id':id}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		
		res.json({error:0,message:'成功',datas:user.place})
	})
})
//地址获取
router.post('/address',function(req,res){
	if(req.cookies.username){
	var id = req.cookies.username;
//	console.log(id);
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		res.json({error:0,message:'成功',datas:user.addressList})
	})
	}
})
//地址添加
router.post('/addSave',function(req,res){
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		user.addressList.push({
			"address":req.body.region,
			"userName":req.body.name,
			"streetName":req.body.particular,
			"tel":req.body.tel,
			"isDefault":false
		})
		user.save();
		res.json({error:0,message:'成功',datas:user})
	})
})

//地址删除
router.post('/addressdele',function(req,res){
	var id = req.cookies.username;
	var siteid = req.body.sit._id;
	User.update({
		'_id': id
	}, {
		$pull: {
			addressList: {
				'_id': siteid
			}
		}
	}).exec(function(err, user) {
//		console.log(user);
		if(err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				error: '0',
				msg: ''
			});
		}

	})
})
//设置默认地址
router.post('/tacitly',function(req,res){
	var id = req.cookies.username;
	var siteid = req.body.sit._id;
//	console.log(id);
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		user.addressList.forEach(function(item){
			if(item.isDefault){
				item.isDefault = false;
			}
			if(item._id == siteid){
				item.isDefault = true;
				user.save();
			}
		})
		res.json({error:0,message:'成功',datas:user.addressList})
	})
})
//获取默认地址
router.post('/defaultAddress',function(req,res){
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		if(user.addressList.lenght != 0){
		user.addressList.forEach(function(item){
//			console.log(item);
			if(item.isDefault){
				res.json({error:0,message:'成功',datas:item})
			}
		})
		}else{
			res.json({error:0,message:'成功',datas:user.addressList})
		}
		
	})
})
//订单确定
router.post('/payment',function(req,res){
	var id = req.cookies.username;
	User.findOne({'_id': id}).exec(function(err,user){
		if(err){
		 return	res.json({error:1,message:'查找失败'})
		}
		var information = '你有一件新的待收货商品';
		var classify = "待收货";
		user.place.forEach( function(item){
		user.readyCargo.push({
		"cargoId":item.placeId,
		"cargoName":item.placeName,
		"salePrice":item.salePrice,
		"cargoImage":item.placeImage,
		"cargoNum":item.placeNum,
		'describe':item.describe
		})
		user.news.push({
		"classify":classify,
	    "message":information,
	    "shopId":item.placeId
		})
		})
		user.place = [];
		user.save();
	User.update({
		'_id': id
	}, {
		$pull: {
			cartList: {
				'checked': true
			}
		}
	}).exec(function(err, user) {
		if(err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			});
		} else {
			res.json({
				error: '0',
				msg: ''
			});
		}

	})
	})
})
//订单离开
router.post('/leave',function(req,res){
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		user.place = [];
		user.save();
		res.json({error:0,message:'离开成功'})
	})
})
//推荐商品获取
router.post('/recommend',function(req,res){
	Good.find().exec(function(err,good){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		
		res.json({error:0,message:'查找成功',datas:user})
	})
})
//待收货
router.post('/waitshops',function(req,res){
	if(req.cookies.username){
	let id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err,user){
		if(err){
			res.json({error:1,message:'查找失败'})
		}
		res.json({error:0,message:'离开成功',datas:user.readyCargo})
	})
	}
})
//确认收货
router.post('/affirm',function(req,res){
	let id = req.cookies.username;
	let shop = req.body.shop;
	let shopid = shop.cargoId
//	console.log(shop.cargoId);
	let times = new Date().toString();
	let indents = new Indent({
	"indentId":shop.cargoId,
    "indentName":shop.cargoName,
    "salePrice":shop.salePrice,
    "describe":shop.describe,
    "indentNum":shop.cargoNum,
    "indentImage":shop.cargoImage,
    "time":times,
    "userName":req.cookies.username
	})
	indents.save();
	User.findOne({'_id': id}).exec(function(err,user){
		if(err){
			return res.json({error:1,message:'查找失败'})
		}
		var information = '你有一件新的待评价商品';
		var classify = "待评价";
		user.noevaluate.push({
			"noevaluateId":shopid,
			"noevaluateName":shop.cargoName,
		    "noevaluateImg":shop.cargoImage
		});
		user.news.push({
		"classify":classify,
	    "message":information,
	    "shopId":shopid
		})
		user
		user.save();
		User.update({'_id': id}, {$pull: {readyCargo: {'cargoId':shopid  }}}).exec(function(err,doc){
		if(err){
			return res.json({error:1,message:'查找失败'})
		}
		
	})
	res.json({error:0,message:'收货成功',datas:user.readyCargo})
	})
})

//搜索页面
router.post('/findshop/:id',function(req,res){
	var name = req.params.id;
	Good.find({productName: {$regex:name, $options:'i'}}).exec(function(err,good){
	if(err){
			return res.json({error:1,message:'查找错误'});
		}
//		console.log(good);
		res.json({error:0,message:'查找成功',datas:good})
	})
})
//全部订单
router.post('/orderindent',function(req,res){
	var name = req.cookies.username;;
	Indent.find({'userName':name}).exec(function(err,shop){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
		
		res.json({error:0,message:'查找成功',datas:shop})
	})
})
//订单清空
router.post('/deleAllIndent',function(req,res){
	var name = req.cookies.username;;
	Indent.remove({'userName':name}).exec(function(err,shop){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
		
		res.json({error:0,message:'查找成功'})
	})
})
//收藏获取
router.post('/collect',function(req,res){
	if(req.cookies.username){
	var name = req.cookies.username;;
	User.findOne({'_id':name}).exec(function(err,shop){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
	
		res.json({error:0,message:'查找成功',datas:shop.collect})
	})
	}
})
//取消收藏
router.post('/nocollect',function(req,res){
	var name = req.cookies.username;
	var id = req.body.id;
	User.update({'_id':name},{$pull: {collect: {'_id':id  }}}).exec(function(err,shop){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
		User.findOne({'_id':name}).exec(function(err,shop){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
		res.json({error:0,message:'查找成功',datas:shop.collect})
	    })
	})
})
//待评价商品的获取
router.post('/evaluatemsg',function(req,res){
	var name =  req.cookies.username;
	User.findOne({'_id':name}).exec(function(err,user){
		if(err){
			return res.json({error:1,message:'查找错误'});
		}
	  res.json({error:0,message:'查找成功',datas:user.noevaluate})
	})
	
})
//评论
router.post('/present',function(req,res){
	var id = req.body.id;
	var name =  req.cookies.username;
	var content = req.body.value;
	var score = req.body.score;
	var now = new Date();
	var times = {
    	date:now.getTime().toString(),
    	year:now.getFullYear(),
    	month:now.getFullYear() + '-' + (now.getMonth() + 1 ),
        day:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate(),
        minute:now.getFullYear() + '-' + (now.getMonth() + 1 ) + '-' + now.getDate() +
                ' ' + ( now.getHours() < 10 ? '0':'' ) + now.getHours() +
                ':' + ( now.getMinutes() < 10 ? '0' : '' ) + now.getMinutes()
    }
	var evaluate = new Evaluate({
	"evaluateId":id,
    "userName":name,
    "evaluateContent":content,
    "time":times,
    "score":score
	});
	evaluate.save();
	User.update({'_id': name}, {$pull: {noevaluate: {'noevaluateId':id }}}).exec(function(err,doc){
		if(err){
			return res.json({error:1,message:'查找失败'})
		}
	})
	res.json({error:0,message:'保存成功'})
})
module.exports = router;