<template>
	<div class="message">
		<headers :titlesNav="titleNav">{{ titleNav }}</headers>
		<h4>消息通知({{messages.length}})</h4>
		<div class="" v-if="messages.length > 0">
			<ul>
				<li v-for="(message,index) in messages" :index="index">
					<div class="">
						<p class="classify">{{message.classify}}</p>
						<p class="msg">{{message.message}} <span @click="read(index)">已读</span></p>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			<p>暂时没有消息~~~</p>
		</div>
		<footers></footers>
	</div>
</template>

<script>
	import Headers  from "./Header";
	import Footers from "./Footer";
	import axios from 'axios';
	export default{
		data:function(){
			return{
				titleNav:'消息',
				messages:[]
			}
		},
		mounted(){
			this.newsGain()
		},
		components:{
			Headers,
			Footers
		},
		methods:{
			newsGain:function(){
				axios.post('/shop/users/newsgain').then( (resData)=>{
					if(resData.data.error == 0){
						this.messages = resData.data.datas
					}else{
						this.messages = [];
					}
				}).catch( (error)=>{
					console.log(error);
				})
			},
			read(index){
				let id = this.messages[index]._id;
				axios.post('/shop/users/newread',{id:id}).then( (resData)=>{
					if(resData.data.error == 0){
						this.messages = resData.data.datas
					}
				}).catch( (error)=>{
					console.log(error);
				})
			}
		}
	}
</script>

<style scoped >
     .message{
     	margin-bottom: 30px;
     }
    h4{
    	margin: 10px;
    	margin-bottom: 0px;
    }	
    ul{
		padding: 0;
		margin: 0;
		list-style: none;
		padding: 10px;
	}
	ul li{
		margin: 10px 0;
		border-bottom: solid 1px #eee;
		padding-bottom: 10px;
	}
	ul li .classify{
		color: #FF4500;
	}
	ul li .msg{
		color: #666;
	}
	ul li .msg span{
		background: #FF0000;
		color: white;
		float: right;
		font-size: 14px;
		padding: 3px 5px;
		border-radius: 5px;
	}
</style>