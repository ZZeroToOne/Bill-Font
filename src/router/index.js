import Vue from 'vue'
import Router from 'vue-router'


const login = () => import('@/zeroBill/login')

const index = () => import('@/zeroBill/index')

const print = () => import('@/print/index')

const home = () => import('@/zeroBill/home')

const pro = () => import('@/zeroBill/product/pro')
const doc = () => import('@/zeroBill/product/doc')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [{
        path: '',
        name: '',
        component: home
      },{
        path: 'pro',
        name: 'pro',
        component: pro
      },{
        path: 'doc',
        name: 'doc',
        component: doc
      },{
        path: 'print',
        name: 'print',
        component: print
      }]
    }
  ]
})
