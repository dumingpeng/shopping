<template>
	<div class="classify">
		<div class="commodity">
			<div class="title">
			<a href="#/search"><input type="search" class="search" name="" value="" placeholder="请输入你喜爱的商品"/></a><br>
			<p>
			<span v-for="(item,index) in classifys" :index="index" @click="addColor(index)" ><a :href="'#/classify/'+item" >{{ item }}</a></span>
		    </p>
		</div>
		<div class="filtrate">
			<span v-for="(item,index) in filtrates">{{item}}</span>
		</div>
		<div class="cont-wrap">
			<ul>
				<li v-for="(message,index) in commodity" :index="index">
					<a :href="'#/specific/' + message._id">
						<img :src="'http://localhost:2000/uploads/'+ message.productImage.split(',')[0]"/>
						
					</a>
						<div>
							<p class="name">{{ message.productName }}</p>
							<p class="introduce"><small>{{ describe[index] }}</small><br><small class="sales">销量</small></p>
							<p class="price">
								<span class="discounts">¥{{ message.salePrice }}</span>
								<span class="cart" :index="index"  @click="addCart(index)">加入购物车</span>
							</p>
						</div>
				</li>
			</ul>
		</div>
		</div>
		<div class="isShow" v-if="isShow" >
			<p>添加购物车成功</p>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import axios from 'axios';
	import $ from 'jquery';
	import Footers from "../components/Footer";
	export default {
		data() {
			return {
				commodity: '',
				describe:'',
				classifys:['精选','男装','数码家电','美食','居家日用'],
				filtrates:['人气','最新','销量','价格'],
				isShow:false
			}
		},
		created() {
			// 组件创建完后获取数据，
			// 此时 data 已经被 observed 了
			this.fetchData()
		},
		watch: {
			// 如果路由有变化，会再次执行该方法
			'$route': 'fetchData'
		},
		mounted(){
			this.addColor();
		},
		components: {
			Footers
		},
		methods: {
			fetchData() {
				let id = this.$route.params.id;
				let that = this
				axios.post('/shop/users/classify/' + id).then((resDate) => {
					if(resDate.data.error == 0) {
						that.commodity = resDate.data.datas;
						let des = [];
						that.commodity.forEach(function(message) {
							if(message.describe.length > 14) {
								des.push(message.describe.substring(0, 14) + '...');
							} else {
								des.push(message.describe);
							}
						})
						that.describe = des;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			addColor(index){
				$('.title span a').removeClass('active');
				$('.title span a').eq(index).addClass('active');
			},
			addCart(index){
				let id = this.commodity[index]._id;
				axios.post('/shop/users/addCart',{id:id}).then( (resData)=>{
					if(resData.data.error == 0){
				       this.isShow = true;
				       setTimeout( ()=>{
					   this.isShow = false
				       },1000)
					}else{
						alert(resData.data.message);
					}
				}).catch( (error)=>{
					console.log(error)
				} )
			}
		}
	}
</script>

<style scoped > 
.classify{
	
}
.title{
	width: 360px;
	padding: 10px 10px 10px 5px;
	height: 60px;
	position: fixed;
	text-align: center;
	background: white;
	border-bottom: solid 1px #eee;
}
.title p {
	text-align: left;
	margin-top:5px;
}
.filtrate{
	border-bottom: solid 1px #eee;
	padding: 2px 5px;
	padding-top: 90px;
}
.filtrate span{
	display: inline-block;
	width: 25%;
	text-align: center;
	font-size: 14px;
	color: #666666;
}
.title p span{
	display: inline-block;
	width: 19%;
	text-align: center;
	color: #666;
}
.title p span a{
	text-decoration: none;
	display: inline-block;
	padding-bottom: 3px;
	color: #666;
}
.title p span a.active{
	border-bottom: solid 2px #FF4500;
	color: #FF4500;
}
.search{
	border: none;
	background: #eee;
	padding: 10px 20px;
	color: #666;
	width: 300px;
	border-radius: 20px;
}
a{
	text-decoration: none;
}
.cont-wrap ul{
	margin: 0;
	padding: 0;
	list-style: none;
	
}
.cont-wrap ul li{
	width: 47%;
	float: left;
	border: solid 1px #ddd;
	margin-left: 6px;
}
.cont-wrap ul li:last-child{
	margin-bottom: 50px;
}
.cont-wrap ul li img{
	width: 100%;
}
.cont-wrap ul li div{
	padding: 5px;
}
.cont-wrap ul li .name{
	color: #666;
	font-size: 14px;
}
.cont-wrap ul li .introduce{
	font-size: 13px;
	margin: 3px 0;
	color: #666;
	overflow: hidden;
}
.cont-wrap ul li .introduce .sales{
	float: right;
}
.cont-wrap ul li .price{
	color: #FF3333;
	overflow: hidden;
	margin-top: 10px;
}
.cont-wrap ul li .price .cart{
	float: right;
	background: -webkit-gradient(linear, 0% 25%, 50% 100%, from(#FF7744), to(#FF3333));
	color: white;
	font-size: 14px;
	padding: 3px;
	border-radius: 3px;
	cursor: pointer;
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