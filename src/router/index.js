import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login/login.vue'
import home from '@/components/home/home.vue'
import users from '@/components/users/users.vue'
import role from '@/components/right/role.vue'
import right from '@/components/right/right.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: login },
    { path: '/home', 
      name: 'home', 
      component: home,
      children: [{
        path: '/users',
        name: 'users',
        component: users
      },{
        path: '/role',
        name: 'role',
        component: role
      },{
        path: '/right',
        name: 'right',
        component: right
      }]
    }
  ]
})
