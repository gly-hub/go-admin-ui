<template>
  <div class="page-wrap">
    <div class="page-content">
      <div class="title">重置密码</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
@use 'sass:map';

.page-wrap {
  position: fixed;
  inset: 0;
  z-index: 8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(15px);

  // background: rgba($color: #000000, $alpha: 0.2);
}

html {
  .page-content {
    background: rgba(
      $color: map.get(globalScss.$light, --color-bg-1),
      $alpha: 50%
    );
  }
}

html.dark {
  .page-content {
    background: rgba(
      $color: map.get(globalScss.$dark, --color-bg-1),
      $alpha: 50%
    );
  }
}

.page-content {
  padding: 40px 60px;
  background: rgba($color: #000, $alpha: 100%);
  backdrop-filter: blur(15px);
  border-radius: 10px;
  box-shadow: 0 0 30px 5px rgba($color: #000, $alpha: 20%);
}

// 输入框边框
:deep(.el-input__wrapper) {
  border-radius: 5px;
  outline: none;
  box-shadow: 0 0 0 1px var(--el-color-primary-light-3) inset;
}

// 验证码按钮边框
:deep(.el-input-group__append) {
  color: var(--color-primary-reverse);
  background-color: var(--el-color-primary-light-3);
  box-shadow:
    0 1px 0 0 var(--el-color-primary-light-3) inset,
    0 -1px 0 0 var(--el-color-primary-light-3) inset,
    -1px 0 0 0 var(--el-color-primary-light-3) inset;
}

.title {
  font-size: 32px;
  color: var(--color-text-2);
}

.form-wrap {
  width: 400px;
  margin-top: 40px;
}

.full-btn {
  width: 100%;
}
</style>
