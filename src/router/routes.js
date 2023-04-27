import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

// 保留页面
const defaultPage = [
  // 系统 前端日志
  {
    path: 'log',
    name: 'log',
    meta: {
      title: '前端日志',
      auth: true
    },
    component: _import('system/log')
  },
  // 刷新页面 必须保留
  {
    path: 'refresh',
    name: 'refresh',
    hidden: true,
    component: _import('system/function/refresh')
  },
  // 页面重定向 必须保留
  {
    path: 'redirect/:route*',
    name: 'redirect',
    hidden: true,
    component: _import('system/function/redirect')
  }
]

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: { auth: true },
        component: _import('system/index')
      },
      // 文章列表
      {
        path: 'article',
        name: 'BlogArticle',
        meta: { title: '文章列表', auth: true },
        component: _import('blog/article')
      },
      // 归档
      {
        path: 'classify',
        name: 'BlogClassify',
        meta: { title: '归   档', auth: true },
        component: _import('blog/classify')
      },
      // 关于博主
      {
        path: 'aboutMe',
        name: 'BlogAboutMe',
        meta: { title: '关于博主', auth: true },
        component: _import('blog/about-me')
      },
      // 给我留言
      {
        path: 'comments',
        name: 'BlogComments',
        meta: { title: '给我留言', auth: true },
        component: _import('blog/comments')
      },
      ...defaultPage
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
