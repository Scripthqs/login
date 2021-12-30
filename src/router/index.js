import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // to 将访问哪一个路径
//   // from 代表从哪个路径跳转而来
//   // next 是一个函数,表示放行
//   //   next() 放行 next('/login') 强制跳转
//   if (to.path === '/login') return next()
//   // 获取token
//   const token = window.sessionStorage.getItem('token')
//   if (!token) return next('/login')
//   next()
// })

export default router
