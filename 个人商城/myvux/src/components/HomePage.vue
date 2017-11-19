<template>
	<div class="homeAll">
		<div class="title">
			<a href="#/search"><input type="search" class="search" name="" value="" placeholder="请输入你喜爱的商品" /></a><br>
			<p>
				<span v-for="(item,index) in classifys" :index="index"><a :href="'#/classify/'+item" >{{ item }}</a></span>
			</p>
		</div>
		<div class="bo">
			<swiper auto :interval="3000" :duration="800" :list="baseList"></swiper>
		</div>
		<div class="shop">
			<h4><i></i>优质商品</h4>
			<ul>
				<li v-for="(message,index) in messages" :index="index">
					<a :href="'#/specific/' + message._id">
						<img :src="'http://localhost:2000/uploads/'+ message.productImage.split(',')[0]" />
						<div>
							<p class="name">{{ message.productName }}</p>
							<small>{{ describe[index] }}</small>
							<p class="price">
								<span class="discounts">¥{{ message.salePrice }}</span>
								<span class="cart">查看商品</span>
								<!--<span class="original">￥</span>-->
							</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Headers from "./Header";
	import Footers from "./Footer";
	import $ from 'jquery';
	import axios from 'axios';
	import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux';
	const baseList = [{
			img: 'http://file.17gwx.com/sqkb/element/2017/11/03/4682059fbdd1369d62.jpeg',
		}, {
			img: 'http://file.17gwx.com/sqkb/element/2017/11/03/5414759fbdd8f364bf.jpeg',
		}, {
			img: 'http://file.17gwx.com/sqkb/element/2017/11/01/1733159f980ac52fee.jpeg',
		},
		{
			img: 'http://file.17gwx.com/sqkb/element/2017/11/01/4260459f980791dc3f.jpeg',
		},
	]
	export default {
		data: function() {
			return {
				baseList: baseList,
				classifys: ['精选', '男装', '数码家电', '美食', '居家日用'],
				messages: '',
				describe: []
			}
		},
		mounted() {
			this.sift();
			this.acquire();
		},
		components: {
			Headers,
			Footers,
			Swiper,
			SwiperItem,
			GroupTitle,
			XButton,
			Divider
		},
		methods: {
			sift:function(index){
				axios.post('/shop/users/sift', {
							category: '精选'
						}).then((data) => {
							if(data.data.error == 0) {
								this.messages = data.data.datas;
								let des = [];
								this.messages.forEach(function(message) {
									if(message.describe.length > 18) {
										des.push(message.describe.substring(0, 18) + '...');
									} else {
//										console.log(1111);
										des.push(message.describe);
									}
								})
								this.describe = des;
//								console.log(this.describe);
							}
						}).catch((error) => {
							console.log(error);
						})
			},
			acquire: function(index) {
				let num = 0;
				let that = this;
				$(document).on('scroll', window, function() {
					//网页长度
					var height = $(this).height();
					//获取内容高度  //屏幕
					var screenHeight = $(window).height();
					//获取滚动偏移量  已经滑动的高度
					var scrollTop = $(window).scrollTop();
					if(scrollTop + screenHeight > height - 2) {
						num += 1;
						axios.post('/shop/users/gain?page='+num, {
							category: '精选'
						}).then((data) => {
							if(data.data.error == 0) {
								
								that.messages = data.data.datas;
								let des = [];
								that.messages.forEach(function(message) {
									if(message.describe.length > 18) {
										des.push(message.describe.substring(0, 18) + '...');
									} else {
										des.push(message.describe);
									}
								})
								that.describe = des;
							}
						}).catch((error) => {
							console.log(error);
						})
					}
				})
			},

		}
	}
</script>

<style scoped>
	.homeAll {
		padding-bottom: 40px;
	}
	
	.title {
		width: 360px;
		padding: 10px 10px 10px 5px;
		position: fixed;
		text-align: center;
		z-index: 200;
		background: white;
	}
	
	.title p {
		text-align: left;
		margin-top: 5px;
	}
	
	.title p span {
		display: inline-block;
		width: 19%;
		text-align: center;
		color: #666;
	}
	
	.title p span a {
		text-decoration: none;
		display: inline-block;
		padding-bottom: 3px;
		color: #666;
	}
	
	.title p span a.active {
		border-bottom: solid 2px #FF4500;
		color: #FF4500;
	}
	
	.search {
		border: none;
		background: #eee;
		padding: 10px 20px;
		color: #666;
		width: 300px;
		border-radius: 20px;
	}
	
	.bo {
		padding-top: 80px;
	}
	
	.shop {
		padding: 10px;
	}
	
	.shop h4 i {
		padding: 1px 2px;
		background: #FF0000;
		margin-right: 3px;
	}
	
	.shop h4 {
		padding: 0;
		margin: 0;
		margin-bottom: 20px;
		height: 20px;
		line-height: 20px;
	}
	
	.shop ul {
		margin: 0;
		padding: 0;
	}
	
	.shop ul li {
		overflow: hidden;
		margin-bottom: 20px;
	}
	
	.shop ul li img {
		width: 120px;
		float: left;
		margin-right: 10px;
	}
	
	.shop ul li div {
		float: left;
	}
	
	.shop ul li div .name {
		color: black;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.shop ul li div small {
		display: inline-block;
		font-size: 12px;
		color: #00B7FF;
		width: 200px;
	}
	
	.shop ul li div .price {
		margin-top: 50px;
		color: #FF3333;
		font-size: 20px;
	}
	
	.shop ul li div .cart {
		background: #FF4500;
		color: white;
		font-size: 14px;
		margin-left: 90px;
		padding: 3px;
		border-radius: 3px;
	}
</style>