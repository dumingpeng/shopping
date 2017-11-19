<template>
	<div class="setting" >
		<h3><a href="#/personage"><i class="fa fa-chevron-left"></i></a>设置中心</h3>
		<p>性别：{{ sex }}</p>
		<a href="#/addImg" class="Img">图像上传</a>
		<p><a href="">关于</a></p>
		<p>版本号：V1.1.0</p>
		<p><span @click="exit" >退出登录</span></p>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import axios from 'axios';
	export default{
		data:function(){
			return{
				sex:"男"
			}
		},
		components:{
			
		},
		methods:{
			exit:function(){
				axios.get("/shop/users/exit").then((data)=>{
					if(data.data.status == 0){
						this.$router.push({path:'/personage'})
						location.reload();
					}
				}).catch((error)=>{
					console.log(error);
				})
			}
		}
	}
</script>

<style scoped >
	.setting{
		width: 100%;
	}
	.setting h3{
		color: #666;
		font-weight: normal;
		margin: 0;
		padding: 0;
		margin: 10px;
		color: #FF3333;
	}
	.setting h3 a{
		margin-right: 120px;
	}
	.setting .Img{
		display: inline-block;
		text-decoration: none;
		width: 100%;
		height: 50px;
		line-height: 50px;
		border: solid 1px #eee;
		border-bottom: none;
		color: #666;
		padding: 10px;
	}
	.setting h3 a i{
		color: #666;
		font-size: 16px;
	}
	.setting p {
		width: 100%;
		height: 50px;
		line-height: 50px;
		border: solid 1px #eee;
		border-bottom: none;
		color: #666;
		padding: 10px;
	}
	.setting p:last-child{
		border-bottom:solid 1px #eee;
	} 
	.setting p a{
		text-decoration: none;
		color:#666;
	}
</style>