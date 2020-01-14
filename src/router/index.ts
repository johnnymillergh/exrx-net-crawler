import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/index.vue'
import HelloWorld from '@/components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: HelloWorld
      }
    ]
  },
  {
    path: '/exrx-net',
    component: Home,
    children: [
      {
        path: '',
        name: 'exrx-net',
        component: () => import(/* webpackChunkName: "exrx-net" */ '@/views/exrx-net/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
