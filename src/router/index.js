import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home'
import about from '../views/about/About.vue'
import Me from '../views/me/Me.vue'
import Cart from '../views/cart/Cart.vue'
import Login from "../views/Login/Login.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta:{
      Myfooter:true
    }
  },
  {
    path: '/me',
    component: Me,
    meta:{
      Myfooter:true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cart',
    component: Cart,
    meta:{
      Myfooter:true
    }
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/about/About.vue'),
    meta:{
      Myfooter:true
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
