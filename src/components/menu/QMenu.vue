<template>
  <div class="menu">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script setup>
</script>

<style scoped>
.menu {
  background-color: var(--quae-color-background);
  color: var(--quae-color-text);
  transition: width 0.3s ease-in-out;
}
</style>
