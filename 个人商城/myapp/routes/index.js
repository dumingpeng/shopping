const express = require('express');
const router = express.Router();
const User = require('../models/users')
const Good = require('../models/good');
const multer = require('multer');
const validator = require('validator');

/* GET home page. */
router.get('/', function(req, res, next) {
	Good.find().exec(function(err,datas){
		if(err){
			return res.json({error:1,message:'查找失败'});
		}
		res.render('index', { 
  	title: '首页',
  	adm:req.session.adm,
  	datas:datas
    });
	})
});


//商品添加
//var tm ;
router.get('/add',function(req,res){
	res.render('add',{
		title:'添加商品',
		adm:req.session.adm
	})
})

var storage = multer.diskStorage({
	destination:'www/uploads',
	filename:function(req,res,cb){
		cb(null, time + '.jpg');
	}
  })
var upload = multer({storage:storage});

var picture=[];
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'www/uploads')
  },
  filename: function (req, file, cb) {
    var suffix = file.mimetype.split("/")[1];
    var fileName = file.fieldname + '-' + Date.now() + "." + suffix;
    picture.push(fileName);
    cb(null,fileName);
  }
})
var upload = multer({ storage: storage })
router.post('/add',upload.array("photo"),function(req,res){
	req.body.picture = picture;	
	var adms = req.session.adm;
	var adm = adms.uname;
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
    req.body.times = times;
    req.body.checked = 1;
    req.body.checked = false;
    console.log(req.body.classify);
    var good = new Good({
    	productName:req.body.name,
	    salePrice:req.body.price,
	    describe:req.body.describe,
	    time:req.body.times,
	    productImage:req.body.picture,
	    checked:req.body.checked,
	    productNum:req.body.productNum,
	    classify:req.body.classify
    })
    
   good.save(function(err){
	 if(err){
		return res.json({error:1,message:'添加失败'});
	  }
	    res.json({error:0,message:'添加成功'});
	    picture = [];
    })
})

//商品修改跳转
router.get('/update/:id',function(req,res){
	var id= req.params.id;
	console.log(id);
	Good.findById(id).exec(function(err,good){
		console.log(good);
		res.render('update', { 
  	title: '更改',
  	good:good
  });
})
})

//商品更改
router.post('/change/:data',function(req,res){
	var id = req.params.data;
	console.log(req.body);
	Good.findByIdAndUpdate(id,req.body).exec(function(err,good){
		if(err){
			return res.josn({error:1,message:'修改失败'});
		}
		res.json({error:0,message:'修改成功'})
	})
})

//商品删除
router.get('/dele/:id',function(req,res){
	var id = req.params.id;
	Good.findByIdAndRemove(id).exec(function(err,good){
		if(err){
			return  res.json({error:0,message:'删除失败'})
		}
		res.redirect('/');
	})
})

//分类页面跳转
router.get('/classify/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	Good.find({'classify':id}).exec(function(err,data){
		console.log(data);
		if(err){
			return res.json({error:1,message:'查找失败'})
		}
		res.render('classify',{
			title: '首页',
  	  adm:req.session.adm,
  	  datas:data
		})
	})
})


//router.get('/search',function(req,res){
//	res.render('search',{
//	  title: '搜索',
//	  adm:req.session.adm,
//	  datas:''
//	})
//})

//搜索
//router.post('/search',function(req,res){
//	var name = req.body.name;
//	Good.find({productName: {$regex:name, $options:'i'}}).exec(function(err,good){
//		if(err){
//			return res.json({error:1,message:'查找错误'});
//		}
//		console.log(good);
//		res.json({error:0,message:'查找成功',data:good})
//	})
//})




module.exports = router;
