<template>
	<div class="address">
		<div class="header">
			<p><i class="fa fa-chevron-left" @click="goback"></i>收货地址管理</p>
		</div>
		<div class="message" v-for="(site,index) in sites" :index="index" > 
			<div class="address">
				<p class="user"><span class="name">{{ site.userName }}</span><span>{{ site.tel }}</span></p>
				<p class="ars">{{ site.address }}{{ site.streetName }}</p>
			</div>
			<p class="sett"><a class="mo" @click="tacitly (index)" v-if="!site.isDefault" ><i></i>设为默认</a><a v-else ><i></i>默认地址</a> <span @click="setting"><i class="fa fa-external-link"></i>设置</span><span @click="dele(index)"><i class="fa fa-trash"></i>删除</span></p>
		</div>
		<a href="#/Addadderss" class="add">
			<p><span class="code">+</span><span>新建地址</span></p>
		</a>
	</div>
</template>

<script>
	import axios from 'axios'
	import $ from 'jquery'
	export default {
		data: function() {
			return{
				sites:''
			}
		},
		components: {
			
		},
		mounted(){
			this.address();
		},
		methods: {
			address(){
			let that = this;
			axios.post('/shop/indent/address').then( (resData)=>{
				if(resData.data.error == 0){
					that.sites = resData.data.datas;
				}
			}).catch( (error)=>{
					alert(error);
			})
			},
			dele(index){
				let sit = this.sites[index];
				$('.message').eq(index).fadeOut();
				axios.post("/shop/indent/addressdele",{sit:sit}).then( (resData)=>{
					if(resData.data.error == 0){
						
					}
				}).catch( (error)=>{
					alert(error);
				})
			},
			tacitly (index){
				let sit = this.sites[index];
				$('.sett a i').eq(index).addClass('active');
				axios.post("/shop/indent/tacitly",{sit:sit}).then( (resData)=>{
					if(resData.data.error == 0){
						this.sites = resData.data.datas;
					}
				}).catch( (error)=>{
					alert(error);
				})
			},
			goback(){
    	    this.$router.go(-1)
            },
            setting(){
            	
            	
            }
		}
	}
</script>

<style scoped>
	.address{
		padding-bottom: 120px;
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
	.message .address{
		border-bottom: solid 1px #ccc;
		padding: 10px;
	}
	.message .address .user{
		margin-bottom: 10px;
	}
	.message .address .user .name{
		margin-right: 30px;
	}
	.message .address .ars{
		color: #666;
		font-size: 14px;
		margin-bottom: 5px;
	}
	.message .sett{
		border-bottom: solid 1px #eee;
		height: 40px;
		line-height: 40px;
		color: #444;
		padding: 0 10px;
		text-align: right;
	}
	.message .sett a{
		text-decoration: none;
		color: #444;
		float: left;
	}
	.message .sett .mo i{
		display: inline-block;
		width: 14px;
		height: 14px;
		border: solid 1px #666;
		border-radius: 100%;
		margin-right: 5px;
	}
	.message .sett .mo i.active{
		background: #FF0000;
		border: solid 1px #FF0000;
	}
	.message .sett span{
		margin-left: 20px;
	}
	.message .sett span i{
		margin-right: 5px;
		font-size: 18px;
	}
	.add{
		padding: 10px 20px;
		position: fixed;
		width: 100%;
		bottom: 0;
		text-decoration: none;
		background: white;
	}
	.add p{
		background: #FF0000;
		color: white;
		width:90%;
		padding: 10px 0;
		text-align: center;
	}
	.add p .code{
		font-size: 28px;
		position: relative;
		bottom:-3px;
		margin-right: 5px;
		line-height: 0;
	}
</style>