<template>
	<div>
		<div class="header">
		<p><i class="fa fa-chevron-left" @click="goback"></i>待评价</p>
	   </div>
		<div v-if="messages.length > 0">
		<ul>
			<li v-for="(message,index) in messages" :index="index" >
				<p class="star">
					<img :src="'http://localhost:2000/uploads/'+ message.noevaluateImg.split(',')[0]"/>
					<p>
					<span class="name"> {{ message.noevaluateName }}</span><br>
					<span class="stars">
						描述评分
					<i v-for="(item,ins) in datas" :index="ins" @click="changestar(index,ins)">{{ item }}</i>
					</span>
					</p>
				</p>
				<div class="cont-wrap">
					<input type="text" placeholder="商品怎么样~" /><br>
					<span class="present" @click="present(index)">提交</span>
				</div>
			</li>
		</ul>
		</div>
		<div v-else>
			<p>没有需要写的评论~</p>
		</div>
		<div class="isShow" v-if="isShow" >
			<p>评价成功</p>
	    </div>
	</div>
</template>

<script>
	import axios from 'axios';
	import $ from 'jquery'
	export default{
		data:function(){
			return{
				messages:'',
				datas:['1','2','3','4','5'],
				isShow:false
			}
		},
		mounted(){
			this.evaluatemsg();
		},
		methods:{
			evaluatemsg(){
				axios.post('/shop/indent/evaluatemsg').then( (resData)=>{
					if(resData.data.error == 0){
						this.messages = resData.data.datas;
					}
				}).catch( (error)=>{
					console.log(error);
				})
			},
			goback(){
    	    this.$router.go(-1)
            },
            changestar(index,ins){
            	$('.stars').eq(index).find('i').eq(ins).addClass('active').siblings().removeClass('active');
            },
            present(index){
            	let id = this.messages[index].noevaluateId;
            	let val = $('.cont-wrap').eq(index).find('input').val();
            	let score = 0;
            	console.log(val);
            	$('.stars').eq(index).find('i').each(function(key,value){
            		if($(this).prop("className") == 'active'){
            			score = key;
            		}
            	})
            	axios.post('/shop/indent/present',{
            		value:val,
            		id:id,
            		score:score
            	}).then( (resData)=>{
            		if(resData.data.error == 0){
            			this.evaluatemsg();
            			this.isShow = true;
            			score = '';
            			val = '';
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
	ul{
		padding: 0;
	}
	i{
		font-style: normal;
	}
	ul li {
		margin-bottom: 20px;
	}
	ul li .stars{
		height: 50px;
		display: inline-block;
		line-height: 40px;
		/*float: left;*/
	}
	ul li .star{
		display: inline-block;
		overflow: hidden;
		height: 60px;
	}
	ul li .star{
		float: left;
	}
	ul li .star  img{
		width: 50px;
		height: 50px;
		float: left;
		margin-right: 10px;
	}
	ul li i{
		margin: 5px;
		border-radius: 100%;
		/*font-size: 22px;*/
		color: #aaa;
		padding: 1px 5px;
		border: solid 1px #eee;
	}
	ul li i.active{
		color: white;
		background: #FF4500;
	}
	ul li .cont-wrap{
		border: solid 1px #eee;
		overflow: hidden;

	}
	ul li .cont-wrap input{
		border: none;
		padding-bottom: 50px;
		font-size: 16px;
	}
	ul li .cont-wrap span{
		float: right;
		padding: 5px 10px;
		background: #FF3333;
		color: white;
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