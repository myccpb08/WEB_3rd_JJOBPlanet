import Vue from 'vue'
import Router from 'vue-router'
import HomePage from './views/HomePage.vue'
import PostPage from './views/PostPage.vue'
import PortfolioPage from './views/PortfolioPage.vue'
import PortfolioWriter from './views/PortfolioWriter.vue'
import PostWriter from './views/PostWriter.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
      {
         path: '/',
         name: 'home',
         component: HomePage
      },
      {
         path: '/post',
         name: 'post',
         component: PostPage
      },
      {
         path: '/portfolio',
         name: 'portfolio',
         component: PortfolioPage
      },
      {
         path: '/portfoliowriter',
         name: 'portfoliowriter',
         component: PortfolioWriter
      },
      {
         path: '/postwriter',
         name: 'postwriter',
         component: PostWriter
      }
  ]
})
