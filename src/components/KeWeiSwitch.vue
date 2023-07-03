<!-- 
Switch 开关：表示两种相互对立的状态间的切换，多用于触发「开/关」。
使用方式如下：
其中 isCollapse 是 boolean 类型
<KeWeiSwitch v-model="isCollapse"></KeWeiSwitch>
-->

<template>
    <div class="collapse" :class="collapse" @click="toggle()">
        <div class="collapse-btn text-inner-shadow">{{ isCollapse ? '+' : '-' }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const isCollapse = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const collapse = ref('collapse-on')

const toggle = () => {
    collapse.value = isCollapse.value ? 'collapse-on' : 'collapse-off'
    isCollapse.value = !isCollapse.value
}

onMounted(() => {

})
</script>

<style scoped>
.collapse {
    width: 52px;
    padding: 1px;
    margin: 10px 5px 5px 5px;
    display: flex;
    justify-content: right;
    border-radius: 30px;
    background: var(--kw-color-background);
    box-shadow: var(--kw-inner-shadow-deep);
}

.collapse-on {
    display: flex;
    justify-content: right;
}

.collapse-off {
    display: flex;
    justify-content: left;
}

.collapse:hover {
    cursor: pointer;
}

.collapse-btn {
    width: 30px;
    margin: 1px;
    display: flex;
    justify-content: center;
    border-radius: 35px;
    background-color: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-high);
}
</style>