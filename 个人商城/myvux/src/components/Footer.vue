<template>
	<div class="footer-wrap">
	<div class="tabber">
    <tabbar>
      <tabbar-item link="/" >
        <i class="fa fa-home" slot="icon" ></i>
        <a slot="label">首页</a>
      </tabbar-item>
      <tabbar-item  link="/message">
        <i class="fa fa-commenting-o" slot="icon" ></i>
        <a slot="label">消息</a>
      </tabbar-item>
      <tabbar-item link="/Cart">
        <i class="fa fa-shopping-cart" slot="icon" > </i>
        <a slot="label">购物车</a>
      </tabbar-item>
      <!--<tabbar-item link="/login" v-else="nickName" >
        <i class="fa fa-shopping-cart" slot="icon" > </i>
        <a slot="label">购物车</a>
      </tabbar-item>-->
      <tabbar-item  link="/Personage">
        <i class="fa fa-user" slot="icon" ></i>
        <a slot="label">个人</a>
      </tabbar-item>
    </tabbar>
  </div>
	</div>
</template>

<script>
	import { Tabbar, TabbarItem, Group, Cell } from 'vux';
	import axios from 'axios';
	import { mapState } from 'vuex';
	export default {
		data: function() {
			return {
				
			}
		},
		mounted(){
			
		},
		components: {
			Tabbar,
			TabbarItem,
			Group,
			Cell
		},
		computed: {
			...mapState([
				'nickName','userImg'
			])
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	a{
		text-decoration: none;
	}
	span{
		padding: 0;
		margin: 0;
	}
	.footer-wrap .tabber{
		position:fixed;
		width: 100%;
		bottom: 0;
	}
</style>