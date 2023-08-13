<template>
  <div class="menu">
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
  },
});

const emit = defineEmits(["menu-item-clicked"]);

const selectMenuItem = (item, index) => {
  item.collapse = !item.collapse;

  emit("menu-item-clicked", index);
};
</script>

<style scoped>
.menu {
  background-color: var(--quae-color-background);
  color: var(--quae-color-text);
}
</style>
