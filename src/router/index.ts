import Index from '@/views/Index.vue'
import Login from '@/views/Login.vue'
import Select from '@/views/Select.vue'
import NotFound from '@/views/NotFound.vue'
import Logo from '@/views/Logo/index.vue'
import Pack from '@/views/Pack/index.vue'
import Poster from '@/views/Poster/index.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/select',
      name: 'select',
      component: Select
    },
    {
      path: '/logo',
      name: 'logo',
      component: Logo
    },
    {
      path: '/pack',
      name: 'pack',
      component: Pack
    },
    {
      path: '/poster',
      name: 'poster',
      component: Poster
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router