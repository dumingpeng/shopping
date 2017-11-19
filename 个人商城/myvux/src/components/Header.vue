<template>
  <div class="header-nav" >
  	<h1>{{ titleNav }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      titleNav:this.titlesNav
    }
  },
  props:['titlesNav']
}
</script>

<style scoped>
 h1{
 	margin: 0;
 	padding: 0;
 	background: -webkit-gradient(linear, 0% 25%, 75% 100%, from(#FF7744), to(#FF3333));
 	color: white;
 	text-align: center;
 	font-size: 16px;
 	height: 40px;
 	line-height: 40px;
 }
</style>
