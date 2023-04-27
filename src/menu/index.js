import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { title: '首页', path: '/index', icon: 'home' },
  // 解决图标和标题挨得太近
  { title: ' 文章列表', path: '/article', icon: 'th-list' },
  { title: ' 归   档', path: '/classify', icon: 'files-o' },
  { title: ' 关于博主', path: '/aboutMe', icon: 'address-card' },
  { title: ' 给我留言', path: '/comments', icon: 'comments' }
])

export const menuAside = supplementPath([])
