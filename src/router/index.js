import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = () => import('../components/home.vue')
const cart = () => import('../components/cart.vue')
const classify = () => import('../components/classify')
const mine = () => import('../components/mine')
const detail = () => import('../components/details')

const routes = [

  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/cart',
    component: cart
  },
  {
    path: '/classify',
    component: classify
  },
  {
    path: '/mine',
    component: mine
  },
  {
    path: '/details/:iid',
    component: detail
  }

]

const router = new Router({
  routes,
  mode: 'history'

})

export default router