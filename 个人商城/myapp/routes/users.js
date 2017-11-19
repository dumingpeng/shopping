const express = require('express');
const router = express.Router();
const User = require('../models/users');
const validator = require('validator');
const crypto = require('crypto');
const Good = require('../models/good');
const multer = require('multer');
const Evaluate = require('../models/evaluate');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

//前端数据获取
router.post('/register', function(req, res) {
//	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password;
	if(!validator.matches(username, /^[\u4E00-\u9FA5A-Za-z0-9]{3,20}$/, 'g')) {
		return res.json({
			error: 1,
			message: '用户名不合法,5-12位,数字字母下划线'
		});
	}
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/, 'g') ||
		!validator.isLength(password, 6, 12)) {
		return res.json({
			error: 1,
			message: '密码长度5-12位，非特殊字符'
		});
	}
	User.findOne({
		'userName': username
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户查找失败'
			})
		}
		if(user) {
			return res.josn({
				error: 1,
				message: '用户已存在'
			});
		}
		var md5 = crypto.createHash('md5');
		passwords = md5.update(req.body.password).digest('hex');
		var user = new User({
			userName: username,
			userPwd: passwords,
			create_time: new Date().getTime().toString()
		});
		user.save();
		res.json({
			error: 0,
			message: '保存成功',
			user: user
		})
	})
})

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if(!validator.matches(username, /^[\u4E00-\u9FA5A-Za-z0-9]{3,20}$/, 'g')) {
		return res.json({
			error: 1,
			message: '用户名不合法,5-12位,数字字母下划线'
		});
	}
	if(!validator.matches(password, /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/, 'g') ||
		!validator.isLength(password, 6, 12)) {
		return res.json({
			error: 1,
			message: '密码长度5-12位，非特殊字符'
		});
	}
	User.findOne({
		'userName': username
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户查找失败'
			})
		}
		if(!user) {
			return res.json({
				error: 1,
				message: '用户不存在，请注册'
			});
		}
		var md5 = crypto.createHash('md5');
		passwords = md5.update(req.body.password).digest('hex');
		if(user.userPwd != passwords) {
			return res.json({
				error: 0,
				message: '密码错误'
			})
		}
		res.cookie('username', user._id);
		res.json({
			error: 0,
			message: '登录成功'
		})
	})

})
//检查登录
router.get("/checkLogin", function(req, res, next) {
	if(req.cookies.username) {
		User.findById({
			'_id': req.cookies.username
		}).exec(function(err, user) {
			res.json({
				status: '0',
				msg: '',
				result: user.userName,
				img:user.userImg
			});
		})
	} else {
		res.json({
			status: '1',
			msg: '未登录',
			result: ''
		});
	}
});
//退出
router.get("/exit", function(req, res) {
	res.cookie("username", "", {
		path: "/",
		maxAge: -1
	});
	res.json({
		status: "0",
		msg: '',
		result: ''
	})
})
//商品首页获取
router.post('/sift',function(req,res){
	var id = req.body.category.toString();
	Good.find({
		'classify': id
	}).limit(3).exec(function(err, data) {
		if(err) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		}
		res.json({
			error: 0,
			message: '查找成功',
			datas: data
		})
	})
})
//商品分页获取
router.post('/gain', function(req, res) {
	var id = req.body.category.toString();
	var page = req.query.page;
	var page = parseInt(page);
	Good.find({
		'classify': id
	}).limit(20 * page).exec(function(err, data) {
//		console.log(data);
		if(err) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		}
		res.json({
			error: 0,
			message: '查找成功',
			datas: data
		})
	})
})
//分类查找
router.post('/classify/:id', function(req, res) {
	var name = req.params.id;
	Good.find({
		'classify': name
	}).exec(function(err, data) {
		//		console.log(data);
		if(err) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		}
		
		res.json({
			error: 0,
			message: '查找成功',
			datas: data
		})
	})
})
//图片上传获取
var picture=[];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'www/users')
  },
  filename: function (req, file, cb) {
    var suffix = file.mimetype.split("/")[1];
    var fileName = file.fieldname + '-' + Date.now() + "." + suffix;
    picture.push(fileName);
    cb(null,fileName);
  }
})
var upload = multer({ storage: storage })
router.post("/publish",upload.array("pic"),function(req,res){
//	console.log(picture);
  var id = req.cookies.username;
  User.findOne({'_id':id}).exec(function(err,user){
  	if(err){
  		return res.json({error:1,message:'查找失败'})
  	}
  	user.userImg = picture;
  	user.save();
  	picture = [];
  	res.json({error:0,message:'上传成功',datas:user})
  })
});
//详情
router.post('/specific/:id', function(req, res) {
	//	console.log(req.params.id);
	var id = req.params.id;
	var name = req.cookies.username;
	Good.findById({
		'_id': id
	}).exec(function(err, data) {
		if(err) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		}
		Evaluate.find({'evaluateId':id}).populate('userName').exec(function(err,evaluate){
		User.findOne({'_id': name}).exec(function(err,user){
			if(err) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		    }
			res.json({
			error: 0,
			message: '查找成功',
			datas: data,
			evaluate:evaluate,
			user:user
		   })
		})
	   })
	})
})
//加入购物车
router.post('/addCart', function(req, res, next) {
	var id = req.body.id;
	Good.findById(id).exec(function(error, good) {
//		console.log(111);
		if(error) {
			return res.json({
				error: 1,
				message: '查找失败'
			})
		}
		if(!req.cookies.username) {
			return res.json({
				error: 1,
				message: '请先登录'
			})
		} else {
			User.findOne({
				'_id': req.cookies.username
			}).exec(function(err, user) {
				function cun() {
					user.cartList.push({
						"commodityId": good._id,
						"commodityName": good.productName,
						"salePrice": good.salePrice,
						"commodityImage": good.productImage,
						"checked": good.checked,
						"describe": good.describe,
						"commodityNum": 1,
					})
					user.save();
				}
				if(user.cartList.length == 0) {
					cun();
				} else {
					var isCun = false;
					user.cartList.forEach(function(item) {
						if(item.commodityId == id) {
							isCun = true;
							item.commodityNum += 1;
							user.save();
						}
					})
					if(!isCun) {
						cun();
					}
				}
				res.json({
					error: 0,
					message: '添加成功'
				})
			})
		}
	})
})
//购物车获取
router.post('/cart', function(req, res) {
	if(req.cookies.username){
	var id = req.cookies.username;
	if(id) {
		User.findOne({
			'_id': id
		}).exec(function(err, user) {
			if(err) {
				return res.json({
					error: 1,
					message: '用户不存在'
				})
			}
			res.json({
				error: 0,
				message: '查找成功',
				datas: user.cartList
			});
		})
	}
	}else{
		res.json({
			error: 1,
			message: '请登录',
		});
	}
})
//收藏
router.post('/collect', function(req, res) {
	var id = req.body.id;
	var name = req.cookies.username;
	Good.findOne({
		'_id': id
	}).exec(function(error, good) {
		if(error) {
			return res.json({
				error: 0,
				message: '商品不存在'
			})
		}
//		console.log(good)
		User.findOne({
			'_id': name
		}).exec(function(err, user) {
			if(err) {
				return res.json({
					error: 1,
					message: '用户不存在'
				})
			}
			var iscun = false;
//			console.log(user);
			if(user.collect.length > 0){
			user.collect.forEach(function(item) {
//				console.log(item)
				if(item._id == id) {
					return res.json({
						error: 0,
						message: '已收藏过该店家'
					})
//					console.log(11);
				} else {
					iscun = true;
				}
			})
			if(iscun){
			user.collect.push({
				"collectId":  good.roductId,
				"collectName":  good.productName,
				"salePrice":  good.salePrice,
				"collectImage":  good.productImage,
				"describe":  good.describe
			})
			user.save();
			}
			}else{
			user.collect.push({
				"collectId":  good.roductId,
				"collectName":  good.productName,
				"salePrice":  good.salePrice,
				"collectImage":  good.productImage,
				"describe":  good.describe
			})
			user.save();
			
			}
			res.json({error:0,message:'收藏成功'})
		})
	})
})
//商品选中
router.post('/pitch', function(req, res) {
	var shopid = req.body.shop._id;
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
		user.cartList.forEach(function(item) {
			if(item._id == shopid) {
				item.checked = !item.checked;
				user.save()
				res.json({
					error: 0,
					message: '选中',
					datas: item.checked
				})
			}
		})

	})
})
//全选
router.post('/pitchAll', function(req, res) {
	var id = req.cookies.username;
	//	console.log(req.body.ischage);
	var change = req.body.ischage;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
		user.cartList.forEach(function(item) {
			item.checked = change;
		})
		user.save()
		res.json({
			error: 0,
			message: '选中'
		})
	})
})
//删除
router.post('/dele', function(req, res) {
	var id = req.cookies.username;
	User.update({
		'_id': id
	}, {
		$pull: {
			cartList: {
				checked: true
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

//购物车商品增加
router.post('/addNum', function(req, res) {
	var shop = req.body.shop;
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
//		console.log(shop);
		user.cartList.forEach(function(item) {
			if(item.commodityId == shop.commodityId) {
				item.commodityNum += 1;
				user.save()

			}
		})
		res.json({
			error: 0,
			message: '增加成功'
		})
	})
})
//，减少
router.post('/subtractNum', function(req, res) {
	var shop = req.body.shop;
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
//		console.log(shop);
		user.cartList.forEach(function(item) {
			if(item.commodityId == shop.commodityId) {
				item.commodityNum -= 1;
				user.save()
				res.json({
					error: 0,
					message: '减少成功',
					datas: item.commodityNum
				})
			}
		})
	})
})
//商品结算
router.post('/close', function(req, res) {
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
		user.cartList.forEach(function(item) {
			if(item.checked) {
				//				if(user.place.length == 0){
				user.place.push({
					"placeId": item.commodityId,
					"placeName": item.commodityName,
					"salePrice": item.salePrice,
					"placeImage": item.commodityImage,
					"placeNum": item.commodityNum,
					"describe": item.describe
				})
			}
		})
		user.save();
		res.json({
			error: 0,
			message: '结算成功'
		})
	})
})
//页面刷新，购物车值变回false
router.post('/flush', function(req, res) {
	
	if(req.cookies.username){
	var id = req.cookies.username;
	User.findOne({
		'_id': id
	}).exec(function(err, user) {
		if(err) {
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
		if(user.cartList) {
			user.cartList.forEach(function(item) {
				item.checked = false;
				user.save();
			})
		}
		res.json({
			error: 0,
			message: '成功'
		});
	})
	}else{
		res.json({
			error: 1,
			message: '请登录',
		});
	}
})
//消息通知获取
router.post('/newsgain',function(req,res){
	if(req.cookies.username){
	var id = req.cookies.username;
	User.findOne({'_id':id}).exec(function(err,user){
		if(err){
			return res.json({
				error: 1,
				message: '用户不存在'
			})
		}
//		console.log(user);
		return res.json({error:0,message:'查找成功',datas:user.news})
	})
	}else{
		res.json({error:1,message:'查找成功'})
	}
})
//消息阅读
router.post('/newread',function(req,res){
	var name = req.cookies.username;
	var id = req.body.id;
//	console.log(id)
	User.update({'_id':name},{$pull: {news: {'_id': id}}}).exec(function(err,doc){
		if(err){
			return res.json({
				error: 1,
				message: '查找不存在'
			})
		}
		User.findOne({'_id':name}).exec(function(err,user){
		if(err){
			return res.json({
				error: 1,
				message: '查找不存在'
			})
		}
//		console.log(user);
		return res.json({error:0,message:'查找成功',datas:user.news})
	})
	})

})
module.exports = router;