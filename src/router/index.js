import Vue from 'vue'
import { Message } from 'element-ui'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import users from '@/components/users/users.vue'
import roles from '@/components/rights/roles.vue'
import rights from '@/components/rights/rights.vue'
import goods from '@/components/goods/goods.vue'
import goodsadd from '@/components/goods/goodsadd.vue'
import params from '@/components/goods/params.vue'
import categories from '@/components/goods/categories.vue'
import orders from '@/components/orders/orders.vue'
import reports from '@/components/reports/reports.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect: "/users",   //默认子路由
      children: [
        {
          path: '/users',
          name: 'users',
          component: users
        },
        {
          path: '/roles',
          name: 'roles',
          component: roles
        },
        {
          path: '/rights',
          name: 'rights',
          component: rights
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods
        },
        {
          path: '/goodsadd',
          name: 'goodsadd',
          component: goodsadd
        },
        {
          path: '/params',
          name: 'params',
          component: params
        },
        {
          path: '/categories',
          name: 'categories',
          component: categories
        },{
          path: '/orders',
          name: 'orders',
          component: orders
        },{
          path: '/reports',
          name: 'reports',
          component: reports
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 1 如果是去登录页则直接跳出守卫
    next()
  } else { // 如果要去的是除了登录的其他路由则都需要判断缓存中是否有token

    const token = localStorage.getItem('token') // 获取缓存中的token
    if (!token) {                              // 2 如果缓存中没有token 则转到登录界面
      Message.warning('请先登录')
      router.push({ name: 'login' })
      return
    }

    next() // 3 如果缓存中有token则跳出守卫
  }
})

export default router
