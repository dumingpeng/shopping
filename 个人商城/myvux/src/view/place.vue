<template>
	<div>
		<div class="header">
			<p><i class="fa fa-chevron-left" @click="goback"></i>确认订单</p>
		</div>
		<div class="address">
			<a href="#/address" v-if="defaultaddress" >
				<p class="user"><span class="name">{{defaultaddress.userName}}</span><span class="tel">{{ defaultaddress.tel }}</span></p>
				<p class="particular">{{defaultaddress.address}}{{ defaultaddress.streetName }}<i class="fa fa-chevron-right"></i></p>
			</a>
			<a href="#/address" v-else >
				<p class="noparticular">请添加地址<i class="fa fa-chevron-right"></i></p>
			</a>
		</div>
		<div class="shop-cont">
			<ul>
				<li v-for="(message ,index) in messages">
					<img :src="'http://localhost:2000/uploads/'+ message.placeImage.split(',')[0]"/>
					
					<div class="">
						<p class="describe">{{ message.placeName }}&nbsp;&nbsp;&nbsp;{{ describe }}</p>
						<p class="price"><span>¥{{message.salePrice}}</span> <span class="num">×{{ message.placeNum }}</span></p>
					</div>
				</li>
			</ul>
		</div>
		<div class="apply">
			<p><span class="money">实付款：¥<span>{{ priceAll() }}</span></span><span class="place" @click="payment">立即下单</span></p>
		</div>
		<div class="ball" v-if="isShow">
		   <div>	
		   <p class="language">便宜不等人，请三思而行~</p>
		   <p class="operation">
		   <span class="ensure" @click="leave" >去意已决</span><span @click="noleave">我再想想</span>
		   </p>
		   </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data:function(){
			return{
			   messages:'',
			   defaultaddress:'',
			   isShow:false,
			   describe:''
			}
		},
		mounted(){
			this.gainShop();
			this.defaultAddress()
		},
		methods:{
			gainShop(){
				var that = this;
				axios.post('/shop/indent/gainShop').then( (resData)=>{
					if(resData.data.error == 0){
//						console.log(resData.data.datas)
						that.messages = resData.data.datas;
						let des = '';
						that.messages.forEach(function(message){
							if(message.describe.length > 24){
								des = message.describe.substring(0,24) + '...'
							}else{
								des = message.describe;
							}
						})
						that.describe = des;
					}
				}).catch( (error)=>{
					console.log(error)
				})
			},
			defaultAddress(){
				let that = this;
				axios.post('/shop/indent/defaultAddress').then( (resData)=>{
					if(resData.data.error == 0){
						that.defaultaddress = resData.data.datas;
					}
				})
			},
			goback(){
			this.isShow = true;
            },
            noleave(){
            this.isShow = false;
            },
            priceAll(){
            	let prices = 0;
            	if(this.messages.length != 0 ){
            	this.messages.forEach( (message)=>{
            		prices += message.salePrice * message.placeNum
            	})
            	}else{
            		prices += this.messages.salePrice * this.messages.placeNum
            	}
            	return prices;
            },
            payment(){
            	axios.post('/shop/indent/payment').then((resData)=>{
            		if(resData.data.error == 0){
            			location.href = '#/complete';
            		}
            	}).catch( (error)=>{
            		console.log(error)
            	})
            },
            leave(){
            	axios.post('/shop/indent/leave').then( (resData)=>{
				if(resData.data.error == 0){
					this.isShow = false;
					this.$router.go(-1);
				}
			})
            }
		}
	}
</script>

<style scoped >
	.header{
		height: 50px;
		border-bottom: solid 1px #ccc;
		line-height: 50px;
		text-align: center;
		padding: 0 20px;
	}
	.header i{
		float: left;
		line-height: 50px;
	}
	.address a{
		display: inline-block;
		text-decoration: none;
		color: #555;
		padding: 10px;
		width: 94%;
		border-bottom: dashed 2px rgba(255,0 ,0,0.4);
	}
	.address a .user{
		margin: 10px 0;
		color: #000000;
	}
	.address a .user .name{
		margin-right: 20px;
	}
	.address a .particular{
		font-size: 14px;
		overflow: hidden;
	}
	.address a .particular i{
		float: right;
	}
	.address a .noparticular i{
		margin-left:240px;
	}
	.shop-cont ul{
		padding: 0;
		margin: 0;
		
	}
	.shop-cont ul li{
		/*width: 100%;*/
		overflow: hidden;
		padding: 10px;
		border-bottom: solid 1px #eee;
	}
	.shop-cont ul li:last-child{
		margin-bottom: 30px;
	}
	.shop-cont ul li img{
		width: 80px;
		float: left;
		margin-right: 10px;
	}
	.shop-cont ul li div .describe{
		margin-bottom: 40px;
	}
	.shop-cont ul li div .price{
		color: #FF0000;
	}
	.shop-cont ul li div .price .num{
		float: right;
	}
	.apply{
		height: 50px;
		border-top: solid 1px #eee;
		line-height: 50px;
		text-align: right;
		position: fixed;
		bottom: 0;
		width: 100%;
		background: white;
	}
	.apply .place{
		background: #FF0000;
		color: white;
		padding: 16px;
		margin-left: 10px;
	}
	.apply .money{
		color: #FF0000;
	}
	.apply .money span{
		font-size: 18px;
	}
	.ball{
		width: 360px;
		height: 640px;
		background:rgba(0,0,0,0.6);
		position: fixed;
		top:0;
		display: flex;
		justify-content: center;
        align-items: center;
	}
	.ball div{
		background: white;
		
		border-radius: 5px;
		
	}
	.ball div .language{
		padding: 30px;
		border-bottom: solid 1px #eee;
	}
	.ball div .operation{
		/*padding: 10px 20px;*/
		padding: 0;
		margin: 0;
	}
	.ball div .operation span{
		display: inline-block;
		width: 50%;
		text-align: center;
	}
	.ball div .operation .ensure{
		color: white;
		padding: 10px 0;
		border-bottom-left-radius: 5px;
		background: #FF0000;
		/*width: 100px;*/
	}
</style>