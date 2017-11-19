<template>
	<div class="">
		<div class="header">
			<p>订单完成</p>
		</div>
		<div class="cont-wrap">
        <img src="../../../myapp/pictures/ok-2.png"/>
        <a href="#/waitgood">查看订单状态</a>
		</div>
		<div class="recommend" >
			<ul>
				<li></li>
			</ul>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Footers from "../components/Footer";
	import axios from "axios";
	export default{
		data:function(){
			return{
				shops:''
			}
		},
		components:{
			Footers
		},
		methods:{
			recommend(){
				axios.post('/shop/indent/recommend').then( (resData)=>{
					console.log(resData);
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
	.cont-wrap{
		text-align: center;
	}
	.cont-wrap img{
		margin-top: 100px;
		width: 140px;
	}
	.cont-wrap a{
		display: block;
		text-decoration: none;
		border: solid 1px #FF7744;
		width: 120px;
		margin: 10px auto;
		color: #FF4500;
		padding: 5px 0;
	}
	.recommend ul{
		margin: 0;
		padding: 0;
	}
</style>