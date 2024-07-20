import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Issue from '@/views/Issue.vue'
import About from '@/views/About.vue'
import User from '@/views/User.vue'
import LogIn from '@/views/LogIn.vue'
import SignIn from "@/views/SignIn.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: LogIn
    },
    {
      path: '/login',
      component: LogIn
    },
    {
      path: '/sign-in',
      component: SignIn
    },
    {
      path: '/home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Home,
      children: [
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: About
        },

        {
          path: '/user',
          name: 'user',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: User
        }
      ]
    },
    {
      path: '/issue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Issue
    }
  ]
})

export default router
