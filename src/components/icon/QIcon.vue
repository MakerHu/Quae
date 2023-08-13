<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :style="{
      width: props.size,
      height: props.size,
      fill: color
    }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'var(--quae-color-text)',
  },
  size: {
    type: String,
    default: "1em",
  },
  //对不同区域的 icon 样式调整，如字体大小
  className: {
    type: String,
    default: "test",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
