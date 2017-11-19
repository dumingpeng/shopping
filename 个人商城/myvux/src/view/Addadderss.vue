<template>
	<div id="">
	<div class="header">
		<p><i class="fa fa-chevron-left" @click="goback" ></i>新建收货地址</p>
    </div>
    <div class="newadd">
    <p class="name">收货人：<input type="text" name='uname' v-model="uname" /></p>
    <p class="tel">手机号码：<input type="text" name='tel'  v-model="tel"  /></p>
    <group>
			<x-address title="所在地区：" v-model="value" raw-value :list="addressData"></x-address>
			<p class="particular" :value="getName(value)">详细地址<input v-model="particular"  placeholder="街道、楼牌号等"></input></p>
    </group>
	<span class="save" @click="addSave">保存</span>
    </div>
	
	</div>
</template>

<script>
	import { Group, XAddress, ChinaAddressV4Data, XButton, Cell, Value2nameFilter as value2name } from 'vux'
	import axios from 'axios'
	export default {
		data: function() {
			return {
				value: [],
				value1:[],
				addressData: ChinaAddressV4Data,
				uname:'',
				tel:'',
				particular:''
			}
		},
		components: {
			Group,
			XAddress,
			XButton,
			Cell
		},
		methods: {
			getName (value){
               this.value1 = value2name(value, ChinaAddressV4Data)
            },
            goback(){
    	    this.$router.go(-1)
            },
            addSave(){
            	let name = this.uname;
            	let tel = this.tel;
                let region = this.value1;
            	let particular = this.particular;
            	axios.post('/shop/indent/addSave',{
            		name:name,
            		tel:tel,
            		region:region,
            		particular:particular
            	}).then( (resData)=>{
            		if(resData.data.error == 0){
            			location.href = "#/address";
            			location.reload();
            		}
            	}).catch( (error)=>{
            		console.log(error);
            	})
            }
		}
	}
</script>

<style scoped>
	input{
		border: none;
	}
	.header{
		height: 50px;
		line-height: 50px;
		text-align: center;
		padding: 0 20px;
	}
	.header i{
		float: left;
		line-height: 50px;
	}
	.newadd p{
		border-top:solid 1px #eee;
		height: 30px;
		padding: 0 14px;
		height: 40px;
		line-height: 40px;
	}
	.newadd .tel{
		height: 20px;
	}
	.newadd .particular input{
		border: none;
		margin-left: 10px;
	}
	.save{
		display: inline-block;
		background: #FF0000;
		color: white;
		padding: 5px 50px;
		position: fixed;
		bottom: 10px;
		left: 120px;
	}
</style>