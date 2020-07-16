import Vue from 'vue'
import VueRouter from 'vue-router'
//引入login组件
import Login from "../components/Login.vue"
import Home from "../components/Home.vue"
import Welcome from "../components/Welcome.vue"
import SumLogin from "../components/SumLogin"
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      redirect: "/welcome",
      children:[
        {path:"/welcome",component: Welcome,},
        {path:"/sumlogin",component:SumLogin},
      ]
    }
]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问
  //from 从哪访问
  //next 接着干什么 next(url)跳转或者重定向url上 如果url是空的话 继续访问to的路径
  if(to.path=='/login') return next();
  //获取user
  const userFlag = window.sessionStorage.getItem("user");
  //无值，返回登录页
  if(!userFlag) return next("/login");
  //符合要求，就放行
  next();
})

export default router
