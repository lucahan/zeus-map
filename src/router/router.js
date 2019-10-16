import Vue from 'vue'
import Router from 'vue-router'
import Main from '../views/Main.vue'
import Map from '../components/Map/Map'
import Form from '../components/Form/Form'
import Login from '../views/Login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {
          path: '/',
          name:'map',
          component: Map,
        },
        {
          path: '/form',
          component: Form,
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
