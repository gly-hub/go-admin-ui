<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/settings'
import { AppMain, NavigationBar, Sidebar, TagsView } from './components'
import { DeviceEnum } from '@/constants/app-key'

const appStore = useAppStore()
const settingsStore = useSettingsStore()

const { showTagsView, fixedHeader } = storeToRefs(settingsStore)

/** 定义计算属性 layoutClasses，用于控制布局的类名 */
const layoutClasses = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceEnum.Mobile,
  }
})

/** 用于处理点击 mobile 端侧边栏遮罩层的事件 */
const handleClickOutside = () => {
  appStore.closeSidebar(false)
}
</script>

<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- mobile 端侧边栏遮罩层 -->
    <div
      v-if="layoutClasses.mobile && layoutClasses.openSidebar"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <!-- 左侧边栏 -->
    <Sidebar class="sidebar-container" />
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 头部导航栏和标签栏 -->
      <div :class="{ 'fixed-header': fixedHeader }" class="layout-header">
        <NavigationBar />
        <TagsView v-show="showTagsView" />
      </div>
      <!-- 页面主体内容 -->
      <AppMain class="app-main" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/mixins';

$transition-time: 0.35s;

.app-wrapper {
  @include clearfix;

  position: relative;
  width: 100%;
}

.drawer-bg {
  position: absolute;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.3;
}

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  overflow: hidden;
  background-color: var(--v3-sidebar-menu-bg-color);
  transition: width $transition-time;
}

.main-container {
  position: relative;
  min-height: 100%;
  margin-left: var(--v3-sidebar-width);
  transition: margin-left $transition-time;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - var(--v3-sidebar-width));
  transition: width $transition-time;
}

.layout-header {
  box-shadow: var(--el-box-shadow-lighter);
}

.app-main {
  position: relative;
  min-height: calc(100vh - var(--v3-navigationbar-height));
  overflow: hidden;
}

.fixed-header + .app-main {
  height: 100vh;
  padding-top: var(--v3-navigationbar-height);
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - var(--v3-header-height));
  }

  .fixed-header + .app-main {
    padding-top: var(--v3-header-height);
  }
}

.hideSidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }

  .main-container {
    margin-left: var(--v3-sidebar-hide-width);
  }

  .fixed-header {
    width: calc(100% - var(--v3-sidebar-hide-width));
  }
}

// 适配 mobile 端
.mobile {
  .sidebar-container {
    width: var(--v3-sidebar-width) !important;
    transition: transform $transition-time;
  }

  .main-container {
    margin-left: 0;
  }

  .fixed-header {
    width: 100%;
  }

  &.openSidebar {
    position: fixed;
    top: 0;
  }

  &.hideSidebar {
    .sidebar-container {
      pointer-events: none;
      transition-duration: 0.3s;
      transform: translate3d(calc(0px - var(--v3-sidebar-width)), 0, 0);
    }
  }
}

.withoutAnimation {
  .sidebar-container,
  .main-container {
    transition: none;
  }
}
</style>
