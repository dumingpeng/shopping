<template>
	<div class="">
 <div id="img-list">
    <img v-for="i in files" :src="i" class="images" :key="i">
    <!--<label for="file-selector" id="file-label">+</label>-->
    <input id="file-selector" type="file" accept="image/jpeg,image/png,image/gif" @change="chooseImage" >
  </div>
  <div id="btn">
     <button @click="btnClick">提交</button>
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	data:function(){
		return{
			 files:'',
       photo:''
		}
	},
  methods:{
    chooseImage:function(e){
            var f = e.target.files[0];
            this.photo = f;
    },
    btnClick:function(){
        var data = new FormData();
        console.log(this.photo)
        data.append("pic",this.photo);
        console.log(data);
        axios.post("/shop/users/publish",data,{
            headers: {
                 "Content-Type": "multipart/form-data"
            }
        }).then(res=>{
            if(!res.data.err){
                this.$router.push({path:'/personage'})
            }
        });

    },
  }
 }
</script>

<style scoped>
	#file-label{
    width: 29vw;
    height: 29vw;
    border: solid 1px black;
    display: inline-block;
    font-size: 80px;
    text-align: center;
    line-height: 100px;
    vertical-align: top;
}

.images{
    width: 29vw;
    height: 29vw;
    border: solid 1px black;
    margin-right: 6px;
}
</style>