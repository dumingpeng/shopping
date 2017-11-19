<template>
	<div>
		<div class="header">
			<p>
				<i class="fa fa-chevron-left" @click="goback"></i>
				<a href="#/search"><input type="search" class="search" name="" value="" :placeholder="value" /></a>
			</p>
		</div>
		<div class="cont-wrap" v-if="(shops.length > 0)">
			<p class="filtrates">
				<span v-for="(filtrate,index) in filtrates">{{filtrate}}</span>
			</p>
			<ul>
				<li v-for="(shop,index) in shops" :index="index">
					<a :href="'#/specific/' + shop._id">
						<img :src="'http://localhost:2000/uploads/'+ shop.productImage.split(',')[0]"/>
						
						<div>
							<p class="name">{{ shop.productName }}</p>
							<small>{{ shop.describe }}</small>
							<p class="price">
								<span class="discounts">¥{{ shop.salePrice }}</span>
								<span class="cart">查看商品</span>
								<!--<span class="original">￥</span>-->
							</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		<div class="nocont" v-else >
			<p>没有该类商品哦~~~</p>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data: function() {
			return {
				shops: '',
				value: '',
				filtrates: ['最新', '销量', '价格']
			}
		},
		created() {
			// 组件创建完后获取数据，
			// 此时 data 已经被 observed 了
			this.findshop();
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'findshop'
		},
		methods: {
			findshop() {
				let id = this.$route.params.id;
				this.value = id;
				let that = this
				console.log(id);
				axios.post('/shop/indent/findshop/' + id).then((resDate) => {
					if(resDate.data.error == 0) {
						that.shops = resDate.data.datas;
					}
				}).catch((error) => {
		        console.log(error)
				})
			},
			goback() {
				this.$router.go(-1)
			},
		}
	}
</script>

<style scoped>
	.header {
		padding: 10px;
		background: #FF5151;
	}
	
	.header p i {
		margin-right: 60px;
		color: white;
	}
	
	.header p a input {
		width: 200px;
		padding: 5px;
		border: none;
	}
	.cont-wrap .filtrates{
		width: 100%;
		padding: 10px 0;
		text-align: center;
		
	}
	.nocont{
		text-align: center;
		margin-top: 20px;
		color: #555;
	}
	.cont-wrap .filtrates span{
		display: inline-block;
		width: 30%;
		font-size: 14px;
		color: #555;
	}
	.cont-wrap ul {
		margin: 0;
		padding: 0;
	}
	
	.cont-wrap ul li {
		overflow: hidden;
		margin-bottom: 20px;
		border-bottom: solid 1px #eee;
		padding-bottom: 5px;
	}
	
	.cont-wrap ul li img {
		width: 110px;
		float: left;
		margin-right: 10px;
	}
	
	.cont-wrap ul li div {
		float: left;
	}
	
	.cont-wrap ul li div .name {
		color: black;
		font-size: 14px;
		margin-bottom: 10px;
	}
	
	.cont-wrap ul li div small {
		font-size: 12px;
		color: #00B7FF;
	}
	
	.cont-wrap ul li div .price {
		margin-top: 50px;
		color: #FF3333;
		font-size: 20px;
	}
	
	.cont-wrap ul li div .cart {
		background: #FF4500;
		color: white;
		font-size: 14px;
		margin-left: 90px;
		padding: 3px;
		border-radius: 3px;
	}
</style>