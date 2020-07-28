import Vue from 'vue'
import App from '../App'
import VueRouter from 'vue-router'
//引入login组件
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue"
import SumLogin from "../components/SumLogin"

//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ ease: 'ease', speed: 500 })
//配置取消转圈
NProgress.configure({ showSpinner: false });
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children:[
        {path:"/welcome",component: Welcome,
          meta:[
            {name:"TOP",url:"/welcome"},
            {name:`売上管理`},
            {name:`売上詳細`}
          ]},
        {path:"/sumlogin",component:SumLogin,
          meta:[
            {name:"TOP",url:"/welcome"},
            {name:`売上管理`},
            {name:`売上登録`}
          ]},
      ]
    }
]

const router = new VueRouter({
  routes

});


//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问
  //from 从哪访问
  //next 接着干什么 next(url)跳转或者重定向url上 如果url是空的话 继续访问to的路径
  if(to.path=='/login') {
    return next();
  }
  //获取user
  const userFlag = window.sessionStorage.getItem("user");
  //无值，返回登录页
  if(!userFlag) {
    return next("/login");
  }else {
    // NProgress开始进度条
    NProgress.start()

    //符合要求，就放行
    next();
  }

});

router.afterEach(transition => {
  NProgress.done();
});


export default router
