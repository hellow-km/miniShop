export default [{
    path: '/my',
    name: 'my',
    component: () => import('@/views/my/my.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/my/star',
    name: 'star',
    component: () => import('@/views/my/myMenu/myStar.vue'),
    meta: {
      title: '收藏'
    }
  },
  {
    name: 'money',
    path: '/my/money',
    component: () => import('@/views/my/myMenu/myMoney.vue'),
    meta: {
      title: '钱包'
    }
  },
  {
    name: 'invest',
    path: '/my/invest',
    component: () => import('@/views/my/myMenu/myInvest.vue'),
    meta: {
      title: '充值'
    }
  }
]
