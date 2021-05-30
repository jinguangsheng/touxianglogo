import Vue from 'vue'
import VueRouter from 'vue-router'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      default: () => import('../views/Home'),
      pc: () => import('../views/Home'),
      mobile: () => import('../views/mobile/mHome')
    }
  },
  {
    path: '/logos',
    name: 'logos',
    components: {
      default: () => import('../views/Logos'),
      pc: () => import('../views/Logos'),
      mobile: () => import('../views/mobile/mLogos')
    }
  },
  {
    path: '/about',
    name: 'about',
    components: {
      default: () => import('../views/About'),
      pc: () => import('../views/About'),
      mobile: () => import('../views/About')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
