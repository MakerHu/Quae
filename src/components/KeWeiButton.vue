
<!-- 使用方式如下：
    其中 type 的可取值为：high-low flat-shallow low-shallow，表示按钮按之前和按之后的效果
<KeWeiButton class="register-btn" type="flat-shallow" @click="goRegister">注 册</KeWeiButton>
-->


<template>
    <div class="kewei-btn" :class="type">
        <slot>
            可微按钮组件
        </slot>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'

const props = defineProps({
    type: { // 可选值：high-low high-shallow flat-shallow low-shallow 
        type: String,
        default: 'high-shallow'
    },
})

</script>

<style scoped>
.kewei-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    height: 34px;
    padding: 5px 10px;
    /* margin: 3px 3px; */
    background: var(--kw-color-background);
    text-shadow: var(--kw-text-inner-shadow);
    cursor: pointer;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.high-low {
    box-shadow: var(--kw-box-shadow-high);
}

.high-low:active {
    box-shadow: var(--kw-box-shadow-low);
    font-size: 96%;
}

.high-shallow {
    box-shadow: var(--kw-box-shadow-high);
}

.high-shallow:active {
    box-shadow: var(--kw-inner-shadow-shallow);
    font-size: 96%;
}

.flat-shallow:active {
    box-shadow: var(--kw-inner-shadow-shallow);
    font-size: 96%;
}

.low-shallow {
    box-shadow: var(--kw-box-shadow-low);
}

.low-shallow:active {
    box-shadow: var(--kw-inner-shadow-shallow);
    font-size: 96%;
}
</style>