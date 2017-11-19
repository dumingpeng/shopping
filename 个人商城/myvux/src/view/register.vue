<template>
	<div class="register">
		<div class="register-wrap">
			<img src="../assets/4.jpg" alt="" />
			<form action="">
				<p>
					<i class="fa fa-user-o"></i><input type="text" name="uname" v-model="username" placeholder="请输入昵称" /><br><br>
				</p>
				<p class="pwd">
					<i class="fa fa-question-circle-o"></i><input type="password" name="password" v-model="password" placeholder="请输入密码" /><br><br>
				</p>
				<p class="apwd">
					<i class="fa fa-question-circle"></i><input type="password" name="apassword" v-model="repassword" placeholder="密码确认" />
				</p>
				<p class="hint">
					<small v-if="isShow">{{ hint }}</small>
				</p>
				<p>
					<span class="home"><a href="/">首页</a></span><span  class="register" @click="register">注册</span>
					<a href="#/login" class="logins">登录</a>
				</p>
			</form>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		data: function() {
			return {
				username: '',
				password: '',
				repassword: '',
				isShow: false,
				hint: ''
			}
		},
		mounted() {

		},
		methods: {
			register: function() {
				//正则验证
				let that = this;
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
				if(this.password != this.repassword){
					this.hint = "两次密码不一致";
					this.isShow = true;
					setTimeout(function() {
					  that.isShow = false;	
					}, 2000)
					return;
				}
				axios.post("/shop/users/register", {
					username:this.username,
					password:this.password
				}).then((resDate)=>{
					if(resDate.data.error == 0){
						location.href = '/#login';
					}
				}).catch((error)=>{
					console.log(error);
				})
			}
		}
	}
</script>

<style scoped>
	.register {
		width: 100%;
		height: 100%;
	}
	
	.register-wrap {
		width: 60%;
		height: 60%;
		margin: 0 auto;
		padding: 20px;
		margin-top: 100px;
		text-align: center;
		/*border: solid 1px #FFBD9D;*/
		border-radius: 5px;
	}
	
	.register-wrap img {
		border: solid 1px #FFFF37;
		width: 50px;
		height: 50px;
		margin: 0;
		border-radius: 10px;
		margin-bottom: 40px;
	}
	
	form .register {
		text-decoration: none;
		background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FF7744), to(#FF3333));
		width: 80px;
		display: inline-block;
		text-align: center;
		color: white;
		padding: 3px 0;
		border-radius: 4px;
		float: right;
		height: 30px;
		line-height: 30px;
	}
	
	form i {
		color: #666;
		margin-right: 20px;
	}
	
	form p {
		border-bottom: solid 1px #ccc;
		line-height: 50px;
		height: 50px;
		margin: 10px 0;
	}
	
	form p:last-child {
		border: none;
	}
	
	form .sex {
		text-align: left;
		color: #666;
	}
	form .apwd{
		margin-bottom: 0px;
	}
	form .hint {
		height: 30px;
		border: none;
		margin: 0;
		padding: 0;
		margin-bottom: 10px;
	}
	
	form small {
		display: inline-block;
		color: #FF4500;
	}
	
	form input {
		border: none;
		color: #666;
		margin: 0;
		padding: 0;
		padding: 5px 0;
	}
	
	form .logins {
		height: 40px;
		float: right;
		line-height: 40px;
		text-decoration: none;
		color: #00B7FF;
		margin-right: 10px;
	}
	
	.home a {
		color: #2828FF;
		line-height: 40px;
		height: 30px;
		text-decoration: none;
		float: left;
	}
</style>