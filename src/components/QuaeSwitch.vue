<!-- 
Switch 开关：表示两种相互对立的状态间的切换，多用于触发「开/关」。
使用方式如下：
其中 isOn 是 boolean 类型
<QuaeSwitch v-model="isOn"></QuaeSwitch>
-->

<template>
  <div class="switch" :class="state" @click="toggle">
    <!-- <div class="switch-btn text-inner-shadow">{{ isOn ? '+' : '-' }}</div> -->

    <div class="switch-btn text-inner-shadow">
      <slot v-if="isOn" name="on">
        <q-icon name="add-bold" size="1em"></q-icon>
      </slot>
      <slot v-if="!isOn" name="off">
        <q-icon name="minus-bold" size="1em"></q-icon>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// const props = defineProps(['modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(["update:modelValue", "change"]);

const currentOnState = ref(true)

const isOn = computed({
  get() {
    return currentOnState.value;
  },
  set(value) {
    currentOnState.value = value
    emit("update:modelValue", value);
    emit("change", value);
  },
});

const state = ref("switch-on");

const toggle = () => {
  state.value = isOn.value ? "switch-off" : "switch-on";
  isOn.value = !isOn.value;
};

onMounted(() => {
  state.value = isOn.value ? "switch-on" : "switch-off";
});
</script>

<style scoped>
.switch {
  width: 52px;
  max-height: 30px;
  padding: 1px;
  /* margin: 10px 5px 5px 5px; */
  /* display: flex;
    justify-content: right; */
  border-radius: 30px;
  background: var(--quae-color-background);
  box-shadow: var(--quae-inner-shadow-deep);
}

.switch-on {
  display: inline-flex;
  justify-content: right;
}

.switch-off {
  display: inline-flex;
  justify-content: left;
}

.switch:hover {
  cursor: pointer;
}

.switch-btn {
  width: 30px;
  margin: 1px;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
  background-color: var(--quae-color-background);
  box-shadow: var(--quae-box-shadow-high);
}
</style>
