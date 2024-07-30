import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/sys/LogIn.vue'),
      meta: {
        showNav: false
      }
    },
    {
      path: '/login',
      component: () => import('@/views/sys/LogIn.vue'),
      meta: {
        showNav: false
      }
    },
    {
      path: '/sign-in',
      component: () => import('@/views/sys/SignIn.vue'),
      meta: {
        showNav: false
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/sys/About.vue'),
      meta: {
        showNav: false
      }
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Home.vue'),
      meta: {
        showNav: true
      }
    },
    {
      path: '/user',
      name: 'user',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/home-page/User.vue'),
      meta: {
        showNav: true
      },
      children: [
        {
          path: '/user-information',
          name: 'user-information',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserInformation.vue'),
          meta: {
            showNav: false
          }
        },
        {
          path: '/user-game-account',
          name: 'user-game-account',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserGameAccount.vue'),
          meta: {
            showNav: false
          }
        },
        {
          path: '/user-order',
          name: 'user-order',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserOrder.vue'),
          meta: {
            showNav: false
          }
        },
        {
          path: '/user-commodity',
          name: 'user-commodity',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserCommodity.vue'),
          meta: {
            showNav: false
          }
        },
        {
          path: '/user-favorites',
          name: 'user-favorites',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/user/UserFavorites.vue'),
          meta: {
            showNav: false
          }
        }
      ]
    },
    {
      path: '/issue',
      name: 'issue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/home-page/Issue.vue'),
      meta: {
        showNav: false
      }
    },
    {
      path: '/recommend',
      name: 'recommend',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/home-page/Recommend.vue'),
      meta: {
        showNav: true
      }
    },
    {
      path: '/message',
      name: 'message',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/home-page/Message.vue'),
      meta: {
        showNav: true
      },
      children: [
        {
          path: '/dialog-box',
          name: 'dialog-box',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('@/views/message/DialogBox.vue'),
          meta: {
            showNav: false
          }
        }
      ]
    },
    {
      path: '/commodity',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Commodity.vue'),
      name: 'commodity',
      meta: {
        showNav: false
      }
    },
    {
      path: '/order',
      name: 'order',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Order.vue'),
      meta: {
        showNav: false
      }
    }
  ]
})

export default router
