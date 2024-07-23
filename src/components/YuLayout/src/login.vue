<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="yu-login-layout">
    <div class="header-container">
      <slot name="header"></slot>
    </div>
    <div class="body-container">
      <slot name="body"></slot>
    </div>

    <div class="foot-container">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.yu-login-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .body-container {
    flex: 1;
  }
}
</style>
