import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { getSidebarStatus, setSidebarStatus } from '@/utils/cache/app-config'
import { DeviceEnum, SIDEBAR_OPENED, SIDEBAR_CLOSED } from '@/constants/app-key'

interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

/** 设置侧边栏状态本地缓存 */
function handleSidebarStatus(opened: boolean) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

export const useAppStore = defineStore('app', () => {
  /** 侧边栏状态 */
  const sidebar: Sidebar = reactive({
    opened: getSidebarStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false,
  })
  /** 设备类型 */
  const device = ref<DeviceEnum>(DeviceEnum.Desktop)

  /** main滚动区域 */
  const scrollRef = ref<HTMLElement | null>(null)

  /** 监听侧边栏 opened 状态 */
  watch(
    () => sidebar.opened,
    (opened) => handleSidebarStatus(opened),
  )

  /** main区域滚动到顶部 */
  const scrollToTop = () => {
    if (!scrollRef.value) return
    scrollRef.value.scrollTop = 0
  }

  /** 切换侧边栏 */
  const toggleSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 关闭侧边栏 */
  const closeSidebar = (withoutAnimation: boolean) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }
  /** 切换设备类型 */
  const toggleDevice = (value: DeviceEnum) => {
    device.value = value
  }

  return {
    device,
    sidebar,
    scrollRef,
    toggleSidebar,
    closeSidebar,
    toggleDevice,
    scrollToTop,
  }
})
