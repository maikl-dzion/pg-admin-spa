import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import DbScheme from './pages/DbScheme.vue'
import DataPage from './pages/DataPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
	
	{
      path: '/scheme',
      name: 'scheme',
      component: DbScheme
    },
	
	{
      path: '/data',
      name: 'data',
      component: DataPage
    },
	
    {
      path: '/test',
      name: 'test',
      component: () => import('./pages/TestPage.vue')
    }
  ]
})
