<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div style="margin-top: 10px; text-align: center">
    <el-button :icon="Search" circle></el-button>
    <el-button type="primary" :icon="Edit" circle></el-button>
    <el-button type="success" :icon="Check" circle></el-button>
    <el-button type="info" :icon="Message" circle></el-button>
    <el-button type="warning" :icon="Star" circle></el-button>
    <el-button type="danger" :icon="Delete" circle></el-button>
    <svg-icon name="refresh" spin></svg-icon>
    <el-switch
      v-model="isDark"
      class="theme-btn"
      style="margin-left: 24px"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="toggleDark"
    />
  </div>
</template>

<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'
import {
  Search,
  Edit,
  Check,
  Message,
  Star,
  Delete,
} from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'

// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
