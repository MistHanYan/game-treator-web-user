import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/LogIn.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/LogIn.vue')
    },
    {
      path: '/sign-in',
      component: () => import('@/views/SignIn.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/About.vue')
    },

    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/user/User.vue'),
      children: [
        {
          path: '/user-information',
          name: 'user-information',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserInformation.vue')
        },
        {
          path: '/user-game-account',
          name: 'user-game-account',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserGameAccount.vue')
        },
        {
          path: '/user-order',
          name: 'user-order',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserOrder.vue')
        },
        {
          path: '/user-commodity',
          name: 'user-commodity',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserCommodity.vue')
        },
        {
          path: '/user-favorites',
          name: 'user-favorites',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserFavorites.vue')
        }
      ]
    },
    {
      path: '/issue',
      name: 'issue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Issue.vue')
    },
    {
      path: '/recommend',
      name: 'recommend',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Recommend.vue'),
      props: true
    },
    {
      path: '/message',
      name: 'message',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/message/Message.vue'),
      children: [
        {
          path: '/dialog-box',
          name: 'dialog-box',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/message/DialogBox.vue')
        }
      ]
    },
    {
      path: '/issue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Issue.vue')
    },
    {
      path: '/commodity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Commodity.vue'),
      name: 'commodity',
      children: [
        {
          path: '/order?id=:id',
          name: 'order',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/Order.vue')
        }
      ]
    },
    {
      path: '/message',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      name: 'message',
      component: () => import('@/views/message/Message.vue'),
    }
  ]
})

export default router
