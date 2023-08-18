<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useDark } from '@vueuse/core'
useDark()
</script>

<style lang="scss" scoped></style>
