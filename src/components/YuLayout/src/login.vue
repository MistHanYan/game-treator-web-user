<template>
  <div class="section yu-login-layout">
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

<style lang="scss" scoped></style>
