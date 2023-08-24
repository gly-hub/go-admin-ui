<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { DeviceEnum } from '@/constants/app-key'

interface Props {
  total: number
}

const props = defineProps<Props>()

const appStore = useAppStore()
const isMobile = computed(() => appStore.device === DeviceEnum.Mobile)
</script>

<template>
  <div class="search-footer">
    <template v-if="!isMobile">
      <span class="search-footer-item">
        <svg-icon name="keyboard-enter" />
        <span>确认</span>
      </span>
      <span class="search-footer-item">
        <svg-icon name="keyboard-up" />
        <svg-icon name="keyboard-down" />
        <span>切换</span>
      </span>
      <span class="search-footer-item">
        <svg-icon name="keyboard-esc" />
        <span>ESC</span>
      </span>
    </template>
    <span class="search-footer-total">共 {{ props.total }} 项</span>
  </div>
</template>

<style lang="scss" scoped>
.search-footer {
  display: flex;
  font-size: 14px;
  color: var(--el-text-color-secondary);

  &-item {
    display: flex;
    align-items: center;
    margin-right: 12px;

    .svg-icon {
      padding: 2px;
      margin-right: 5px;
      font-size: 20px;
      background-color: var(--el-fill-color);
    }
  }

  &-total {
    margin: 0 0 0 auto;
  }
}
</style>
