<template>
  <div>
    <h1>首页</h1>
    <svg-icon name="refresh" spin></svg-icon>
    <el-button @click="submit()">test</el-button>
  </div>
</template>

<script setup lang="ts">
import { getUserInfo } from '@/api/login'
const submit = () => {
  console.log(getUserInfo())
}
</script>
