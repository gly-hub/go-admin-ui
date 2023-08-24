<script lang="ts" setup>
import { ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'

interface Props {
  buttonTop?: number
}

const props = withDefaults(defineProps<Props>(), {
  buttonTop: 350,
})

const buttonTopCss = props.buttonTop + 'px'
const show = ref(false)
</script>

<template>
  <div class="handle-button" @click="show = true">
    <el-icon :size="24">
      <Setting />
    </el-icon>
  </div>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped>
.handle-button {
  position: fixed;
  top: v-bind(buttonTopCss);
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  color: #fff;
  pointer-events: auto;
  cursor: pointer;
  background-color: var(--v3-rightpanel-button-bg-color);
  border-radius: 6px 0 0 6px;
}
</style>
