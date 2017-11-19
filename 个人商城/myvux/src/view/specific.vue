<template>
  <div class="post">
  <div class="header">
  	<i @click="goback" class="fa fa-chevron-left"></i>
  	<a href="specific" v-for="(item,index) in message">{{ item }}</a>
  </div>
  <div class="cont-wrap">
  	<!--<img :src="'http://localhost:2000/uploads/'+ shop.productImage.split(',')[0]"/>-->
  <!--<swiper auto :interval="3000"  :duration="800" :list="baseList"></swiper>-->
  <swiper auto height="360px">
      <swiper-item   class="swiper-demo-img" v-for="(item, index) in base" :key="index">
      	<img :src=" 'http://localhost:2000/uploads/' + item">
      </swiper-item>
    </swiper>
  <div class="cont">
  <p class="name">{{ shop.productName }}&nbsp;&nbsp;&nbsp;{{shop.describe}}</p>
  <p class="sales">
  <span class="discounts">¥{{ shop.salePrice }}</span>
  <span class="buy" >已有人购买</span>
  <p class="discounts">领取优惠券<i class="fa fa-chevron-right"></i></p>
  <p class="integral"><span>积分</span>购买可得{{ integral }}积分<i class="fa fa-chevron-right"></i></p>
  <p class="describe">
  	<i class="fa fa-check-circle-o"></i>正品保证
  	<i class="fa fa-check-circle-o"></i>极速退款
  	<i class="fa fa-check-circle-o"></i>赠运费险
  </p>
  </p>
  
  </div>
  </div>
  <div class="comment">
   <h4><span>评论{{ appraises.length }}</span></h4>
   <ul>
   	<li v-for="(appraise,index) in appraises" >
   		<p class="name"><img :src="'http://localhost:2000/users/'+ appraise.userName.userImg"/>{{ appraise.userName.userName }}</p>
   		<p>评价：<span>{{ appraise.evaluateContent }}</span></p>
   	</li>
   </ul>
  </div>
  <div class="footer" > 
  	<a><i class="fa fa-bell-o"></i>联系卖家</a>
  	<a @click="collect" class="nocollect" v-if="!collectShow" ><i class="fa fa-heart-o"></i>收藏</a>
  	<a class="collect active" v-else ><i class="fa fa-heart"></i>已收藏</a>
  	<a href="#/cart"><i class="fa fa-shopping-cart"></i>购物车</a>
  	<i class="add"  @click="addCart" >加入购物车</i>
  </div>
  <div class="isShow" v-if="isShow" >
			<p>添加购物车成功</p>
	</div>
  </div>
</template>

<script >
	
import axios from 'axios';
import $ from 'jquery';
import { Swiper, GroupTitle, SwiperItem, XButton, Divider } from 'vux';
export default {
  data () {
    return {
      shop:'',
      message:['商品','详情','评价'],
      isShow:false,
      base:[],
      appraises:'',
      integral:'',
      collectShow:false
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
   components: {
    Swiper,
    SwiperItem,
    GroupTitle,
    XButton,
    Divider
  },
  methods: {
    fetchData () {
      let id = this.$route.params.id;
      let that = this
      axios.post('/shop/users/specific/' + id).then( (resDate)=>{
      	if(resDate.data.error == 0){
      		this.shop = resDate.data.datas;
      		this.base = that.shop.productImage.split(',');
      		this.appraises = resDate.data.evaluate;
      		this.integral = resDate.data.datas.salePrice / 2;
      		let collects = resDate.data.user.collect;
      		collects.forEach( (item)=>{
      			if(item.collectName == this.shop.productName){
      				this.collectShow = true;
      			}
      		})
      	}
      }).catch((error)=>{
      	console.log(error)
      })
    },
    goback(){
    	  this.$router.go(-1)
    },
    addCart(){
    	  this.isShow = true;
				setTimeout( ()=>{
					this.isShow = false
				},1000)
    	  let id = this.shop._id;
//  	  console.log(id);
				axios.post('/shop/users/addCart',{id:id}).then( (resData)=>{
					if(resData.data.error == 0){
						
					}else{
						alert(resData.data.message);
					}
				}).catch( (error)=>{
					console.log(error)
				})
    },
    collect(){
    	let id = this.shop._id;
//  	console.log(id);
    	axios.post('/shop/users/collect',{id:id}).then( (resData)=>{
//  		console.log(resData)
    		if(resData.data.error == 0){
//  			console.log(11);
    			$('.collect').addClass('active');
    			this.collectShow = true;
    		}
    	}).catch( (error)=>{
    		alert(error);
    	})
    }
  }
}
</script>
<style scoped>
	.post{
		margin-bottom: 50px;
	}
	.header{
		width: 100%;
		height: 30px;
		background: white;
		padding: 5px;
		border-bottom: solid 1px #ccc;
		position: fixed;
		line-height: 30px;
	}
	.header a{
		text-decoration: none;
		color: #222;
		display: inline-block;
		width: 10%;
		margin-left: 56px;
	}
	.cont-wrap{
		padding-top: 40px;
		width: 100%;
	}
	.cont-wrap img{
		width: 100%;
	}
	.cont-wrap .cont{
		padding: 10px;
	}
	.cont-wrap .cont .name{
		margin-bottom: 10px;
		font-size: 15px;
	}
	.cont-wrap .cont .sales{
		overflow: hidden;
		height: 30px;
		line-height: 30px;
	}
	.cont-wrap .cont .sales .discounts{
		color: #FF0000;
		font-size: 18px;
	}
	.cont-wrap .cont .sales .buy{
		float: right;
		color: #666;
		font-size: 14px;	
		line-height: 34px;	
	}
	.cont .discounts{
		margin:20px 0;
		padding: 0 10px ;
		padding-bottom:10px ;
		border-bottom:solid 1px #eee; 
		font-size: 14px;
		color: #666;
	}
	.cont .discounts i{
		float: right;
		line-height: 26px;
	}
	.cont .integral{
		margin:20px 0;
		padding: 0 10px ;
		padding-bottom:10px ;
		border-bottom:solid 1px #eee; 
		font-size: 14px;
		color: #666;
	}
	.cont .integral span{
		border: solid 1px #FF4500;
		color: #FF4500;
		margin-right: 10px;
	}
	.cont .integral i{
		float: right;
		line-height: 26px;
	}
	.cont .describe {
		color: #666;
		font-size: 14px;
	}
	.cont .describe i{
	 color: #FF4500;
	 margin-left: 30px;
	 margin-right: 5px;
	}
	.comment{
		padding: 10px;
	}
	.comment span{
		/*float: right;*/
	}
	.comment ul{
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.comment ul li{
		margin: 10px;
		border-bottom: solid 1px #ddd;
		padding-bottom: 5px;
	}
	.comment ul li img{
		width:30px;
		border-radius: 50%;
	}
	.comment ul li p{
		font-size: 14px;
		color: #555;
	}
	.comment ul li .name{
		color: #FF4500;
	}
	.footer{
		height: 50px;
		background: white;
		border-top: solid 1px #eee;
		position: fixed;
		bottom: 0;
		width: 100%;
	}
	.footer a{
		text-decoration: none;
		width: 80px;
		display: inline-block;
		text-align: center;
		font-size: 10px;
		color: #666;
	}
	.footer a i{
		display:block;
		margin-top: 10px;
		font-size: 16px;
	}
	.footer .add{
		display: inline-block;
		font-style: normal;
		font-size: 15px;
		position: relative;
		top: -6px;
		padding: 15px 15px;
		background: #FF0000;
		color: white;
	}
	.footer .collect.active{
		color: #FF0000;
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