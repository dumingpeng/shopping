const express = require('express');
const router = express.Router();
const Adm = require('../models/adm');
const crypto = require('crypto');



//注册跳转
router.get('/admzhuce',function(req,res){
	res.render('zhuce',{
		title:'注册',
		adm:req.session.adm
	})
})
//注册保存
router.post('/admzhuce',function(req,res){
	var uname = req.body.uname;
	var pass = req.body.password;
	var passRe = req.body['re-password'];
	Adm.findOne({uname:uname}).exec(function(err,data){
		if(pass != passRe){
	        return res.json({error:1,message:'两次密码不一致，请重新输入'});
	    }
		if(data){
			return res.json({error:1,message:'用户已注册'});
		}
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');
		var adm = new Adm({
			uname:req.body.uname,
			password:password,
		})
		adm.save(function(err){
			if(err){
				return res.json({error:1,message:'添加失败'});
			}
			res.json({error:0,message:'管理员注册成功'});
		})
	})
})

//登录跳转
router.get('/admlogin',function(req,res){
	res.render('login',{
		title:'登录',
		adm:req.session.adm
	})
})
//登录详细
router.post('/admlogin',function(req,res){
	var uname = req.body.uname;
	var pass = req.body.password;
	Adm.findOne({uname:uname}).exec(function(err,data){
		if(err){
			return res.json({error:1,message:'查找失败'});
		}
		if(!data){
			return res.json({error:1,message:'用户未注册，请注册'});
		}
		var md5 = crypto.createHash('md5');
		var password = md5.update(req.body.password).digest('hex');
		if(password != data.password){
			return res.json({error:1,message:'密码错误'});
		}
		req.session.adm = data;
		res.json({error:0,message:'管理员登录成功'});
	})
	
})

//退出
router.get('/exit',function(req,res){
	req.session.adm = null;
	res.redirect('/');
})

module.exports = router;