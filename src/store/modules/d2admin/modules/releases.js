import util from '@/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('D2Blog', `v${process.env.VUE_APP_VERSION}`)
      console.log('Document  https://d2.pub/zh/doc/d2-admin')
    }
  }
}
