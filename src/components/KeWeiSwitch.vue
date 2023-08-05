<!-- 
Switch 开关：表示两种相互对立的状态间的切换，多用于触发「开/关」。
使用方式如下：
其中 isOn 是 boolean 类型
<KeWeiSwitch v-model="isOn"></KeWeiSwitch>
-->

<template>
    <div class="switch" :class="state" @click="toggle">
        <div class="switch-btn text-inner-shadow">{{ isOn ? '+' : '-' }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// const props = defineProps(['modelValue'])
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['update:modelValue', 'change'])

const isOn = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
        emit('change', value)
    }
})

const state = ref('switch-on')

const toggle = () => {
    state.value = isOn.value ? 'switch-off' : 'switch-on'
    isOn.value = !isOn.value
}

onMounted(() => {
    state.value = isOn.value ? 'switch-on' : 'switch-off'
})
</script>

<style scoped>
.switch {
    width: 52px;
    padding: 1px;
    margin: 10px 5px 5px 5px;
    /* display: flex;
    justify-content: right; */
    border-radius: 30px;
    background: var(--kw-color-background);
    box-shadow: var(--kw-inner-shadow-deep);
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
    display: flex;
    justify-content: center;
    border-radius: 35px;
    background-color: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-high);
}
</style>