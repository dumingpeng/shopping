import Vue from 'vue';
import Router from 'vue-router';
//首页
import HomePage from '@/components/HomePage';
//消息
import Message  from '@/components/Message';
//购物车
import Cart from '@/components/Cart';
//个人
import Personage from '@/components/Personage';
//设置
import Setting from '@/view/Setting';
//登录
import Login from '@/view/Login';
//注册
import register from '@/view/register';
//添加图片
import addImg from '@/view/addImg';
//商品详细
import specific from '@/view/specific';
//商品分类
import classify from '@/view/classify';
//订单页面
import place from '@/view/place';
//地址页面
import address from '@/view/address';
//地址添加
import Addadderss from '@/view/Addadderss';
//订单完成
import complete from '@/view/complete';
//待收货页面
import waitGood from '@/view/waitGood';
//搜索跳转
import search from '@/view/search';
//搜索商品跳转
import searchs from '@/view/searchs';
//全部订单
import allIndent from '@/view/allIndent';
//全部订单
import collect from '@/view/collect';
//评论
import evaluate from '@/view/evaluate';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HomePage
    },
    {
    	path:'/message',
    	component: Message
    },
    {
    	path:'/cart',
    	component: Cart
    },
    {
    	path:'/personage',
    	component: Personage
    },
    {
    	path:'/setting',
    	component: Setting
    },
    {
    	path:'/login',
    	component: Login
    },
    {
    	path:'/register',
    	component: register
    },
     {
    	path:'/addImg',
    	component: addImg
    },
    {
    	path:'/specific/:id',
    	component: specific
    },
     {
    	path:'/classify/:id',
    	component: classify
    },
    {
    	path:'/place',
    	component: place
    },
    {
    	path:'/address',
    	component: address
    },
     {
    	path:'/Addadderss',
    	component: Addadderss
    },
    {
    	path:'/complete',
    	component: complete
    },
    {
    	path:'/waitGood',
    	component: waitGood
    },
    {
    	path:'/search',
    	component: search
    },
    {
    	path:'/searchs/:id',
    	component: searchs
    },
    {
    	path:'/allIndent',
    	component: allIndent
    },
    {
    	path:'/collect',
    	component: collect
    },
     {
    	path:'/evaluate',
    	component: evaluate
    }
  ]
})
