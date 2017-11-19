<template>
	<div class="login">
		<div class="login-wrap">
		<img src="../assets/4.jpg" alt="" />
		<form action="">
			<p>
			<i class="fa fa-user-o"></i><input type="text" name="uname" placeholder="请输入昵称" v-model="username" /><br><br>
			</p>
			<p class="pwd" > 
			<i class="fa fa-question-circle-o" ></i><input type="password" name="password" v-model="password"  placeholder="请输入密码"/><br><br>
			</p>
			<span class="home"><a href="/">首页</a></span><span href="" @click="login"  class="logins" >登录</span><a href="#/register" class="register">注册</a>	
		</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data:function(){
			return{
				username:'',
				password:''
			}
		},
		mounted(){
			
			
		},
		methods:{
			//正则验证
				login:function(){
				let str1 = new RegExp(/^[\u4E00-\u9FA5A-Za-z0-9]{3,20}$/);
				let str2 = new RegExp(/^(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{5,}/);
				if(!(str1.test(this.username))) {
					this.hint = "请输入正确的昵称格式";
					this.isShow = true;
					setTimeout(function() {
					  that.isShow = false;	
					}, 2000)
					return;
				}
				if(!(str2.test(this.password))) {
					this.hint = "请输入正确的密码格式";
					this.isShow = true;
					setTimeout(function() {
					  that.isShow = false;	
					}, 2000)
					return;
				}
				axios.post("/shop/users/login", {
					username:this.username,
					password:this.password
				}).then((resDate)=>{
					console.log(resDate);
					if(resDate.data.error == 0){
						this.$router.push({path:'/personage'})
					}else{
						alert(resDate.data.message);
					}
				}).catch((error)=>{
					console.log(error);
				})
				},
		}
	}
</script>

<style scoped >
.login{
	width: 100%;
	height: 640px;
}
.login-wrap{
	width: 60%;
	height: 50%;
	margin: 0 auto;
	padding: 20px;
	margin-top: 100px;
	text-align: center;
	border: solid 1px #FFBD9D;
	border-radius: 5px;
}
.login-wrap img{
	border: solid 1px #FFFF37;
	width: 50px;
	height: 50px;
	margin: 0;
	border-radius: 10px;
	margin-bottom: 40px;
}
form .logins{
	text-decoration: none;
	background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FF7744), to(#FF3333));
	width: 80px;
	display: inline-block;
	text-align: center;
	color: white;
	padding: 3px 0;
	border-radius: 4px;
	float: right;
}
form i{
	color: #666;
	margin-right: 20px;
}
form  p{
	border-bottom: solid 1px #ccc;
	line-height: 50px;
	height: 50px;
	margin: 10px 0;
}
form .pwd{
	margin-bottom: 50px;
}
form input{
	border: none;
	color: #666;
	margin: 0;
	padding: 0;
	padding:5px 0;
}
form .register{
	height: 40px;
	float: right;
	line-height: 40px;
	text-decoration: none;
	color: #00B7FF;
	margin-right: 10px;
}
.home a{
	color:#2828FF;
	line-height: 40px;
	height: 30px;
	text-decoration: none;
	float: left;
}
</style>