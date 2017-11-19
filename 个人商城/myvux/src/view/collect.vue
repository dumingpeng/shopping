<template>
<div class="">
	<div class="header">
		<p><i class="fa fa-chevron-left" @click="goback"></i>收藏商品</p>
	</div>
	<div class="shop-cont " v-if="collects.length > 0">
			<ul>
				<li v-for="(message ,index) in collects" :index="index" >
					<img :src="'http://localhost:2000/uploads/'+ message.collectImage.split(',')[0]"/>
					<div class="">
						<p class="describe">{{ message.collectName }}</p>
						<p class="price"><span class="prices">¥{{message.salePrice}}</span><span class="nocollect" @click="nocollect(index)">取消收藏</span></p>
					</div>
				</li>
			</ul>
	  </div>
	  <div v-else >
	  	<p>没有收藏的商品哦~</p>
	  </div>
</div>
</template>

<script>
	import axios from 'axios'
	export default{
		data:function(){
			return{
				collects:''
			}
		},
		mounted(){
			this.collect();
		},
		methods:{
			goback(){
    	    this.$router.go(-1)
            },
            collect(){
            	axios.post('/shop/indent/collect').then( (resData)=>{
            		if(resData.data.error == 0){
            			this.collects = resData.data.datas
            			console.log(this.collects);
            		}
            	}).catch( (error)=>{
            		alert(error);
            	})
            },
            nocollect(index){
            	let id = this.collects[index]._id ;
            	axios.post('/shop/indent/nocollect',{id:id}).then( (resData)=>{
            		if(resData.data.error == 0){
            			this.collects = resData.data.datas
            		}
            	}).catch( (error)=>{
            		alert(error);
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
	.indent{
		padding-bottom: 40px;
	}
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
	.shop-cont ul li div .price .nocollect{
		display: inline-block;
		float: right;
		margin-top: 10px;
		background: #FF0000;
		color: white;
		padding:6px 16px;
	}
	.footer{
		height: 20px;
		line-height: 20px;
		position: fixed;
		bottom: 0;
		text-align: right;
		width: 98%;
		padding: 10px;
		border-top: solid 1px #eee;
		background: white;
	}
	.footer p span{
		background: #FF0000;
		padding: 15px 30px;
		color: white;
	}
</style>