<!-- 使用方式如下：
<KeWeiInput class="login-input input-passowrd"
        v-model="password"
        type="password"
        icon="Lock"
        placeholder="密码"
        @onEnterKey="login" />
         -->

<template>
    <div class="m-search">
        <el-icon class="search-icon" :class="disabled ? '':'icon-hover'" :style="iconRight ? { right: '15px' } : { left: '15px' }" @click="onEnterKey">
            <component class="search-icon" :is="icon" />
        </el-icon>
        <input class="search-input text-inner-shadow inner-shadow" :class="disabled ? '':'inner-shadow-deep-hover input-hover'" v-model="value" :type="type" :disabled="disabled"
            @keyup.enter="onEnterKey" :placeholder="placeholder"
            :style="{ 'text-align': textAlign ? textAlign : 'left', 'padding-left': icon ? (iconRight ? '15px' : '45px'):'15px', 'padding-right': icon ? (iconRight ? '45px' : '15px'):'15px' }" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps(['modelValue', 'placeholder', 'iconRight', 'icon', 'textAlign', 'type', 'disabled'])
const emit = defineEmits(['update:modelValue', 'onEnterKey'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const onEnterKey = () => {
    emit('onEnterKey', value.value)
}

onMounted(() => {
})
</script>

<style scoped>
.m-search {
    display: inline-block;
    height: 40px;
}

.search-input {
    width: 100%;
    height: 100%;
    outline: none;
    border: 0px;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 15px;
    color: #5c5c5c;
}

.m-search:hover .input-hover {
    font-size: 96%;
}

.search-icon {
    z-index: 999;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 50%;
    /* left: 15px; */
    transform: translateY(-50%);
    color: #5c5c5c;
}

.m-search:hover .icon-hover {
    width: 20px;
    height: 20px;
}
</style>