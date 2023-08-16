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
</script>
