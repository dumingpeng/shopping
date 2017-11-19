<template>
	<div class="cart">
		<headers :titlesNav="titleNav">{{ titleNav }}</headers>
		<p class="all"><i @click="pitchAll"></i>全选<span @click="show">编辑</span></p>
		<ul>
			<li v-for="(item,index) in carts">
				<div class="Img">
					<i :index="index" @click="pitch(index)"></i>
					<img :src="'http://localhost:2000/uploads/'+ item.commodityImage.split(',')[0]"/>
				</div>
				<div class="cont">
					<p class="name">{{ item.commodityName }}</p>
					<p class="describe">{{ item.describe }}</p>
					<p class="price">
						<span class="salePrice">¥{{ item.salePrice }}</span>
						<span class="num">
							<a class="subtract" @click="subtract(index)">-</a>{{ item.commodityNum }}
							<a class="add" @click="add(index)">+</a>
						</span>
					</p>
				</div>
			</li>
		</ul>
		<div class="close" v-if="!isShow">
			<p><span>合计：{{ price.toFixed(2) }}</span><span class="closes" @click="close">去结算<small>({{ num }})</small></span></p>
		</div>
		<div class="dele" v-if="isShow">
			<p>
				<span>移入关注</span><span @click="dele">删除</span></p>
		</div>
		<p class="isball" v-if="isball">
			您还没有选择商品哦
		</p>
		<footers></footers>
	</div>

</template>

<script>
	import Headers from "./Header";
	import Footers from "./Footer";
	import axios from 'axios';
	import $ from 'jquery';
	import { mapState } from 'vuex';
	export default {
		data: function() {
			return {
				titleNav: '购物车',
				carts: '',
				ischage: false,
				isShow: false,
				num: 0,
				price: 0.00,
				numAll: 0,
				isball: false,
				user:''
			}
		},
		components: {
			Headers,
			Footers
		},
		computed: {
			...mapState([
				'nickName'
			])
		},
		mounted() {
			this.Cart();
			this.flush();
		},
		methods: {
			Cart() {
				let that = this;
				axios.post('/shop/users/cart').then((resData) => {
					if(resData.data.error == 0) {
						that.carts = resData.data.datas;
					}else{
						this.carts = [];
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			dele() {
				axios.post('/shop/users/dele').then((resData) => {
					if(resData.data.error == 0) {
						console.log(111);
						location.reload();
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			pitch(index) {
				let shop = this.carts[index];
				let that = this;
				$('.price').eq(index).find('a').addClass('active');
				axios.post('/shop/users/pitch', {
					shop: shop
				}).then((resData) => {
					if(resData.data.error == 0) {
						if(resData.data.datas) {
							$('.Img i').eq(index).addClass('active');
							let nums = 0;
							$('.Img i').each((key, value) => {
								nums = key;
							})
							if($('.Img i').eq(index).prop("className") == 'active') {
								that.numAll += 1;
							}
							console.log(that.numAll);
							if(that.numAll - 1 == nums) {
								$('.all i').addClass('active');
							}
							that.price += (that.carts[index].salePrice * that.carts[index].commodityNum);
							that.num += that.carts[index].commodityNum;
						} else {
							that.numAll -= 1;
							$('.all i').removeClass('active');
							$('.Img i').eq(index).removeClass('active');
							$('.price').find('a').removeClass('active');
							that.price -= (that.carts[index].salePrice * that.carts[index].commodityNum);
							that.num -= that.carts[index].commodityNum;
						}
					}
				}).catch((error) => {
					console.log(error);
				})
			},
			pitchAll() {
				let that = this;
				this.ischage = !this.ischage;
				let change = this.ischage;

				if(change) {
					$('.price').find('a').addClass('active');
					$('i').addClass('active');
					this.carts.forEach((item) => {
						this.price += (item.salePrice * item.commodityNum);
						this.num += item.commodityNum;
					})
				} else {
					$('.price').find('a').removeClass('active');
					$('i').removeClass('active');
					this.price = 0;
					this.num = 0;
				}
				axios.post('/shop/users/pitchAll', {
					ischage: change
				}).then((resData) => {
					if(resData.data.error == 0) {

					}
				}).catch((error) => {
					console.log(error)
				})
			},
			show() {
				this.isShow = !this.isShow;
			},
			add(index) {
				let shop = this.carts[index];
				let that = this
				if($('.Img i').eq(index).prop("className") == 'active') {
					return;
				}
				axios.post('/shop/users/addNum', {
					shop: shop
				}).then((resData) => {
					if(resData.data.error == 0) {
						that.carts[index].commodityNum += 1;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			subtract(index) {
				let shop = this.carts[index];
				let that = this;
				if($('.Img i').eq(index).prop("className") == 'active') {
					return;
				}
				if(shop.commodityNum == 1) {
					$('.price .subtract').eq(index).addClass('active');
					return
				}
				axios.post('/shop/users/subtractNum', {
					shop: shop
				}).then((resData) => {
					if(resData.data.error == 0) {
						that.carts[index].commodityNum -= 1;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			close() {
				if(this.num == 0) {
					this.isball = !this.isball;
					setTimeout(() => {
						this.isball = !this.isball;
					}, 2000)
					return;
				}
				axios.post('/shop/users/close').then((resData) => {
					if(resData.data.error == 0) {
						location.href = '#/place'
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			flush() {
				axios.post('/shop/users/flush').then((resData) => {
					if(resData.data.error == 0) {

					}else{
						this.carts = [];
					}
				}).catch((error) => {
					console.log(error)
				})
			}
		}
	}
</script>

<style scoped>
	.cart {}
	
	.cart ul {
		padding: 0;
	}
	
	.cart .all {
		padding: 10px;
		border: solid 1px #eee;
		color: #666;
		overflow: hidden;
	}
	
	.cart .all span {
		float: right;
	}
	
	.cart .all i {
		display: inline-block;
		width: 10px;
		height: 10px;
		border: solid 1px #666;
		border-radius: 100%;
		margin-right: 5px;
	}
	
	.cart .all i.active {
		background: #FF4500;
		border: solid 1px #FF4500;
	}
	
	.cart ul li {
		overflow: hidden;
		border: solid 1px #eee;
		border-top: none;
		/*width: 100%;*/
		padding: 10px;
	}
	
	.cart ul li:last-child {
		margin-bottom: 80px;
	}
	
	.cart ul li .Img {
		float: left;
		margin-right: 10px;
	}
	
	.cart ul li .Img i {
		display: inline-block;
		width: 10px;
		height: 10px;
		border: solid 1px #666;
		border-radius: 100%;
		margin-bottom: 40px;
		margin-right: 5px;
	}
	
	.cart ul li .Img i.active {
		background: #FF4500;
		border: solid 1px #FF4500;
	}
	
	.cart i.active {
		background: #FF4500;
		border: solid 1px #FF4500;
	}
	
	.cart ul li .Img img {
		width: 80px;
	}
	
	.dele {
		height: 30px;
		border: solid 1px #eee;
		line-height: 30px;
		position: fixed;
		width: 100%;
		bottom: 50px;
		border-bottom: none;
		padding: 10px;
		overflow: hidden;
		text-align: right;
	}
	
	.dele span {
		border: solid 1px #bbb;
		color: #444;
		padding: 5px 10px;
		margin: 0 13px;
		cursor: pointer;
	}
	
	.dele span:last-child {
		border: solid 1px #FF7744;
		color: #FF0000;
	}
	
	.dele a {
		text-decoration: none;
		color: #000000;
		margin-right: 110px;
	}
	
	.dele a i {
		display: inline-block;
		width: 10px;
		height: 10px;
		border: solid 1px #666;
		border-radius: 100%;
		margin-right: 5px;
	}
	
	.close {
		height: 40px;
		border: solid 1px #eee;
		line-height: 40px;
		position: fixed;
		width: 98%;
		bottom: 50px;
		border-bottom: none;
		padding: 0 10px;
		overflow: hidden;
		background: white;
	}
	
	.close .closes {
		float: right;
		background: #FF0000;
		padding: 0 20px;
		line-height: 40px;
		color: white;
	}
	
	.cont .name {
		font-size: 14px;
		margin-bottom: 4px;
	}
	
	.cont .describe {
		font-size: 14px;
		margin-bottom: 2px;
	}
	
	.cont .price {
		margin-top: 20px;
	}
	
	.cont .price .salePrice {
		color: #FF0000;
		font-size: 18px;
	}
	
	.cont .price .num {
		float: right;
	}
	
	.cont .price .num .subtract {
		border: solid 1px #aaa;
		padding: 0 5px;
		margin-right: 5px;
	}
	
	.cont .price .num .subtract.active {
		background: #eee;
	}
	
	.cont .price .num .add {
		font-size: 16px;
		border: solid 1px #aaa;
		padding: 0 5px;
		margin-left: 5px;
	}
	
	.cont .price .num .add.active {
		background: #eee;
	}
	
	.isball {
		background: rgba( 105, 105, 105, 0.8);
		padding: 10px;
		width: 150px;
		color: white;
		position: fixed;
		left: 100px;
		top: 300px;
		border-radius: 5px;
	}
</style>