<template>
  <div class="d2-layout-header-aside-group" :style="styleLayoutMainGroup" :class="{grayMode: grayActive}">
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="d2-theme-header" :style="{ opacity: this.searchActive ? 0.5 : 1 }" flex-box="0" flex>
        <router-link
          to="/index"
          :class="{'logo-group': true, 'logo-transition': asideTransition}"
          :style="{width: '65px'}"
          flex-box="0">
          <img :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
        </router-link>
        <d2-menu-header flex-box="1"/>
        <!-- 顶栏右侧 -->
        <div v-if="actionBtnVisible" class="d2-header-right" flex-box="0">
          <d2-header-search @click="handleSearchClick"/>
          <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
          <d2-header-log v-if="$env === 'development'"/>
          <d2-header-fullscreen/>
          <d2-header-theme/>
          <d2-header-size/>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div flex-box="0" :style="{width: '20px'}"></div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search ref="panelSearch" @close="searchPanelClose"/>
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-scale">
            <div v-if="!searchActive" class="d2-theme-container-main-layer" flex="dir:top">
              <!-- tab -->
<!--              <div class="d2-theme-container-main-header" flex-box="0">-->
<!--                <d2-tabs/>-->
<!--              </div>-->
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <keep-alive :include="keepAlive">
                    <router-view :key="routerViewKey" />
                  </keep-alive>
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuHeader from './components/menu-header'
// import d2Tabs from './components/tabs'
import d2HeaderFullscreen from './components/header-fullscreen'
import d2HeaderSearch from './components/header-search'
import d2HeaderSize from './components/header-size'
import d2HeaderTheme from './components/header-theme'
import d2HeaderLog from './components/header-log'
import { mapState, mapGetters } from 'vuex'
import mixinSearch from './mixins/search'
export default {
  name: 'd2-layout-header-aside',
  mixins: [
    mixinSearch
  ],
  components: {
    d2MenuHeader,
    // d2Tabs,
    d2HeaderFullscreen,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderLog
  },
  data () {
    return {
      // [侧边栏宽度] 正常状态
      asideWidth: '200px',
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: '65px',
      // 窗口宽度
      windowWidth: 375,
      // 功能按钮显现
      actionBtnVisible: true
    }
  },
  mounted () {
    // 窗口大小改变事件
    window.onresize = () => {
      return (() => {
        this.windowWidth = window.innerWidth
        this.actionBtnVisible = this.windowWidth >= 404
      })()
    }
  },
  watch: {
    // 实时监听screenWidth的变化
    // screenWidth: {
    //   handler: function (val, oldVal) {
    //     if (val < 1550) {
    //       console.log('屏幕宽度小于1550px')
    //     } else {
    //       console.log('屏幕宽度大于1550px')
    //     }
    //   },
    //   immediate: true
    // }
  },
  computed: {
    ...mapState('d2admin', {
      keepAlive: state => state.page.keepAlive,
      grayActive: state => state.gray.active,
      transitionActive: state => state.transition.active,
      asideCollapse: state => state.menu.asideCollapse,
      asideTransition: state => state.menu.asideTransition
    }),
    ...mapGetters('d2admin', {
      themeActiveSetting: 'theme/activeSetting'
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey () {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || ''
      return `${stamp ? `__stamp-${stamp}-` : ''}${this.$route.path}`
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup () {
      return this.themeActiveSetting.backgroundImage
        ? { backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')` }
        : {}
    }
  }
}
</script>

<style lang="scss">
// 注册主题
@import '~@/assets/style/theme/register.scss';
</style>
