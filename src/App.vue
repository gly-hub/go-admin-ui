<script lang="ts" setup>
// 将 Element Plus 的语言设置为中文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { usePermissionStore } from './store/modules/permission'
import { watch } from 'vue'
import { useTheme } from '@/hooks/useTheme'

/** 初始化主题 */
const { initTheme } = useTheme()
initTheme()

const init = () => {
  console.log('init')
}

const permissionStore = usePermissionStore()
// 响应初始化状态
watch(
  () => permissionStore.init,
  (val) => {
    if (val) init()
  },
  { immediate: true },
)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
