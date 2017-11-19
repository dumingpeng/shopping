<template>
 <div>
 	<div class="header">
		<p><i class="fa fa-chevron-left" @click="goback"></i>待收货</p>
	</div>
	
	<div class="shop-cont " v-if="waitshops.length > 0">
			<ul>
				<li v-for="(message ,index) in waitshops" :index="index" >
					<img :src="'http://localhost:2000/uploads/'+ message.cargoImage.split(',')[0]"/>
					
					<div class="">
						<p class="describe">{{ message.cargoName }}&nbsp;&nbsp;&nbsp;<span>{{ describe[index] }}</span></p>
						<p class="price"><span class="prices">¥{{message.salePrice}}</span> <span class="affirm" @click="affirm(index)">确认收货</span></p>
					</div>
				</li>
			</ul>
	</div>
	<div v-else>
		<p>没有商品哦</p>
	</div>
	<div class="isShow" v-if="isShow" >
			<p>收货成功</p>
	</div>
 </div>
</template>

<script>
	import axios from "axios";
	import $ from "jquery";
	export default{
		data:function(){
			return{
				waitshops:[],
				describe:'',
				isShow:false
			}
		},
		mounted(){
			this.Waitshops();
		},
		methods:{
			Waitshops(){
				let that = this;
				axios.post('/shop/indent/waitshops').then( (resData)=>{
					console.log(resData.data.datas)
					if(resData.data.error == 0){
						this.waitshops = resData.data.datas;
						let des = [];
					    this.waitshops.forEach( function(waitshop){
					    	if(waitshop.describe.length > 20){
								des.push(waitshop.describe.substring(0,20) + '...')
							}else{
								des.push(waitshop.describe);
							}
					    })
					    that.describe = des;
					}
				}).catch( (error) =>{
					console.log(error)
				})
			},
			goback(){
    	    this.$router.go(-1)
            },
            affirm(index){
            	let shop = this.waitshops[index];
            	$('li').eq(index).fadeOut();
            	axios.post('/shop/indent/affirm',{shop:shop}).then( (resData)=>{
            		if(resData.data.error == 0){
            			this.waitshops = resData.data.datas;
            			this.isShow = true;
            			setTimeout( ()=>{
            				this.isShow = false;
            			},1000)
            		}
            	}).catch( (error)=>{
            		console.log(error)
            	})
            }
		}
	}
</script>

<style scoped>
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
	.shop-cont ul{
		padding: 0;
		margin: 0;
		
	}
	.shop-cont ul li{
		overflow: hidden;
		padding: 0 10px;
		border-bottom: solid 1px #eee;
	}
	.shop-cont ul li img{
		width: 102px;
		float: left;
		margin-right: 10px;
	}
	.shop-cont ul li div .describe{
		margin-bottom: 40px;
	}
	.shop-cont ul li div .price{
		color: #FF0000;
		overflow: hidden;
	}
	.shop-cont ul li div .price .prices{
		display: inline-block;
		margin-top: 20px;
	}
	.shop-cont ul li div .price .affirm{
		background: #FF0000;
		padding: 8px;
		color: white;
		float: right;
		border-radius: 5px;
	}
	.isShow{
	background: rgba(0,0,0,0.7);
	width: 120px;
	height: 30px;
	position: fixed;
	left: 110px;
	top: 320px;
	line-height: 30px;
	color: white;
	text-align: center;
	padding: 10px;
	border-radius: 5px;
}
</style>