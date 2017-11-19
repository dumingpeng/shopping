<template>
	<div class="">
		<div class="search">
			<a href="#/personage"><i class="fa fa-chevron-left"></i></a>
			<input type="search" placeholder="请输入商品" v-model="message" /><a class="find" :href="'#/searchs/'+message">搜索</a>
		</div>
	</div>
	
</template>

<script>
	export default{
		data:function(){
			return{
				message:''
			}
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.search {
		padding: 10px;
		background: #FF5151;
	}
	.search i{
		color: white;
	}
	.search  input{
		margin:0 10px 0 20px;
		border: none;
		background: #eee;
		padding: 10px 10px;
		width: 240px;
		border-radius: 20px;
	}
	.search  .find{
		background: #00B7FF;
		color: white;
		padding: 6px;
		border-radius: 5px;
		text-decoration: none;
	}
</style>