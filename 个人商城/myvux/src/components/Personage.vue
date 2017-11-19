<template>
	<div class="personage">
		<div class="header-nav">
			<div class="cog">
				<h1>{{ titleNav }}</h1>
				<a href="#/setting"><i class="fa fa-cog"></i>设置</a>
			</div>
			<p class="image">
				<img v-if="!userImg" src="../assets/4.jpg" alt="" />
				<img v-else :src="'http://localhost:2000/users/'+ userImg"/>
			</p>
			<p class="login">
				<a href="#/login" v-if="!nickName">登录</a>
				<span v-else>{{ nickName }}</span>
			</p>
		</div>
		<div class="content-wrap">
			<h3>我的工具</h3>
			<ul>
				<li>
					<a href="">
						<i class="fa fa-money"></i>
						<span>积分</span>
					</a>
				</li>
				<li>
					<a href="#/address">
						<i class="fa fa-address-book"></i>
						<span>地址管理</span>
					</a>
				</li>
				<li>
					<a href="#/waitGood">
						<i class="fa fa-indent"></i>
						<span>待收货</span>
					</a>
				</li>
				<li>
					<a href="#/evaluate">
						<i class="fa fa-indent"></i>
						<span>待评价</span>
					</a>
				</li>
				<li>
					<a href="#/collect">
						<i class="fa fa-star-o"></i>
						<span>收藏</span>
					</a>
				</li>
				<li>
					<a href="#/allIndent">
						<i class="fa fa-inbox"></i>
						<span>全部订单</span>
					</a>
				</li>
			</ul>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Footers from "./Footer";
	import { mapState } from 'vuex';
	import axios from 'axios';
	export default {
		data: function() {
			return {
				titleNav: '个人中心'
			}
		},
		computed: {
			...mapState([
				'nickName','userImg'
			])
		},
		components: {
			Footers
		},
		mounted() {
			this.checkLogin();
		},
		methods: {
			checkLogin() {
				axios.get("/shop/users/checkLogin").then(res => {
					var res = res.data;
//					console.log(res);
					if(res.status == "0") {
//						console.log('00')
						this.$store.commit("updateUserInfo",res.result);
						this.$store.commit("updateUserImg",res.img);
					}
				})
			}
		}
	}
</script>

<style scoped>
	.header-nav {
		height: 130px;
		background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FF7744), to(#FF3333));
		padding: 0px 10px;
		text-align: center;
	}
	
	.header-nav .cog {
		width: 100%;
	}
	
	.header-nav .cog h1 {
		margin: 0;
		padding: 0;
		color: white;
		font-size: 16px;
		line-height: 40px;
		width: 60%;
		height: 30px;
		display: inline-block;
		text-align: right;
	}
	
	.header-nav .cog a {
		width: 38%;
		height: 30px;
		display: inline-block;
		text-align: right;
		color: white;
		text-decoration: none;
	}
	
	.header-nav .cog a i {
		margin-right: 6px;
	}
	
	.header-nav .image img {
		border-radius: 100%;
		width: 50px;
		height: 50px;
	}
	
	.header-nav .login {
		margin-top: 3px;
	}
	
	.header-nav .login a {
		/*margin-top: 10px;*/
		display: inline-block;
		color: white;
		background: #FF7744;
		text-decoration: none;
		width: 50px;
		height: 30px;
		line-height: 30px;
		border: solid 1px white;
		border-radius: 5px;
	}
	
	.header-nav .login span {
		color: white;
	}
	
	.content-wrap h3 {
		margin: 0;
		padding: 0;
		font-size: 16px;
		margin: 10px;
		color: #666;
	}
	
	.content-wrap ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.content-wrap ul li {
		height: 40px;
		border: solid 1px #eee;
		padding: 10px;
		line-height: 40px;
		border-bottom: none;
	}
	
	.content-wrap ul li:last-child {
		border-bottom: solid 1px #eee;
	}
	
	.content-wrap ul li a {
		text-decoration: none;
	}
	
	.content-wrap ul li a i {
		color: #FF4500;
		margin-right: 5px;
	}
	
	.content-wrap ul li a span {
		color: #333;
	}
</style>