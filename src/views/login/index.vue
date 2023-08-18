<template>
  <div class="login-wrap">
    <el-switch
      v-model="isDark"
      class="theme-btn"
      style="margin-left: 24px"
      inline-prompt
      :active-icon="Moon"
      :inactive-icon="Sunny"
      @change="toggleDark"
    />
    <h1>2222</h1>
    <!-- 背景 -->
    <div class="back-wrap">
      <div class="bg-item left one"></div>
      <div class="bg-item right two"></div>
      <div class="bg-item left three"></div>
      <div class="bg-item right four"></div>
    </div>
    <reset-password
      class="reset-password"
      @update:showResetPassword="1"
    ></reset-password>
  </div>
</template>

<script lang="ts" setup>
import { Sunny, Moon } from '@element-plus/icons-vue'
import resetPassword from './resetPassword.vue'
import { useDark, useToggle } from '@vueuse/core'

// 暗黑主题切换
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style>
input:-internal-autofill-selected {
  color: rgb(255 255 255) !important;
  background-color: transparent !important;
  background-image: none !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-transition: background-color 50000s ease-out;
  transition: background-color 50000s ease-out;
  -webkit-transition-delay: 50000s;
  transition-delay: 500000s;
}
</style>
<style scoped lang="scss">
.login-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: var(--el-color-primary-light-5);
}

.theme-btn {
  position: absolute;
  top: 50px;
  right: 100px;
  z-index: 9;
}

// 背景
.back-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--el-color-primary-light-9);

  .bg-item {
    position: absolute;

    &.left {
      bottom: 0;
      left: 0;
      filter: drop-shadow(5px 0 20px rgb(0 0 0 / 10%));
    }

    &.right {
      right: 0;
      bottom: 0;
      filter: drop-shadow(-5px 0 20px rgb(0 0 0 / 20%));
    }

    &.one {
      z-index: 6;
      border-right: 60vw solid transparent;
      border-bottom: 50vh solid var(--el-color-primary-light-3);
    }

    &.two {
      z-index: 5;
      border-bottom: 70vh solid var(--el-color-primary-light-5);
      border-left: 80vw solid transparent;
    }

    &.three {
      z-index: 4;
      border-right: 90vw solid transparent;
      border-bottom: 90vh solid var(--el-color-primary-light-7);
    }

    &.four {
      z-index: 3;
      border-bottom: 110vh solid var(--el-color-primary-light-8);
      border-left: 110vw solid transparent;
    }
  }
}

.loogin-container {
  position: relative;
  z-index: 2;
  padding: 20px;
}

.login-title {
  font-size: 48px;
  color: var(--color-primary);
}

.form-wrap {
  width: 400px;
  margin: 0 auto;
  margin-top: 5vh;
  color: var(--color-text-2);

  :deep(.el-input__wrapper) {
    border: 1px solid var(--el-color-primary-light-3);
    border-radius: 5px;
    outline: none;
    box-shadow: none;

    &.is-focus,
    &:hover {
      box-shadow: 0 0 0 1px var(--el-color-primary) inset !important;
    }
  }

  :deep(.el-input__prefix) {
    color: var(--color-text-2);
  }

  :deep(.el-input__inner) {
    // color: var(--color-text-2);
    // outline: none;
    height: 40px;
  }
}

.other-wrap {
  width: 400px;
  margin: 0 auto;
  margin-top: 10px;
  text-align: right;
}

.login-btn {
  // font-size: 16px;
  display: block;
  width: 400px;
  height: 40px;
  margin: 20px auto;
}
</style>
