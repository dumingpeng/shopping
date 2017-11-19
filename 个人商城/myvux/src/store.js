import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
	nickName:'',
    userImg:''
	},
	mutations:{
	updateUserInfo(state,nickName) {
      state.nickName = nickName;
    },
    updateUserImg(state,userImg) {
      state.userImg = userImg;
    },
    updateCartCount(state,cartCount){
      state.cartCount += cartCount;
    }
   }
})

export default store;