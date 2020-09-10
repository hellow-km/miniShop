export default [{
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/home.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '注册'
    }
  },
  {
    path: '/info',
    component: () => import('@/views/goodInfo/info.vue'),
    children: [{
        path: '',
        redirect: 'goodInfo'
      },
      {
        path: 'goodInfo',
        name: 'goodInfo',
        component: () => import('@/views/goodInfo/goodInfo.vue'),
        meta: {
          title: '商品',
          keepAlive: true
        },
      },
      {
        path: 'reviews',
        name: 'reviews',
        component: () => import('@/views/goodInfo/reviews.vue'),
        meta: {
          title: '评论',
          keepAlive: true
        },
      },
      {
        path: 'giveGood',
        name: 'giveGood',
        component: () => import('@/views/goodInfo/giveGood.vue'),
        meta: {
          title: '推荐',
          keepAlive: true
        }
      },
      {
        path: 'params',
        name: 'params',
        component: () => import('@/views/goodInfo/params.vue'),
        meta: {
          title: '参数',
          keepAlive: true
        },
      },
    ]
  },

  {
    path: '/list',
    name: 'list',
    component: () => import('@/views/list/list.vue'),
    meta: {
      title: '分类'
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: {
      title: '404'
    }
  }
]
