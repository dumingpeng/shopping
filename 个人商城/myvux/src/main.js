import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'

import './assets/font-awesome/css/font-awesome.min.css'
import router from "./router";
import store from './store';
import axios from 'axios'

import {AjaxPlugin} from 'vux'

Vue.use(AjaxPlugin);

FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
  mounted(){
    this.checkLogin();
  },
  methods:{
  	 checkLogin(){
      axios.get("/shop/users/checkLogin").then(res=> {
        var res = res.data;
//      console.log(res.img);
        if (res.status == "0") {
//        console.log('00')
          this.$store.commit("updateUserInfo", res.result);
          this.$store.commit("updateUserImg",res.img);
        }
      });
    }
  }
}).$mount('#app-box')
//可以通过el属性，将实例挂载到DOM树上，
//也可以用new Vue().$mount('#app')，手动将实例挂载在DOM上