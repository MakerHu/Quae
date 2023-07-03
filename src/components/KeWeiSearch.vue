<!-- 使用方法如下
<KeWeiSearch class="search" v-model="keyword" placeholder="搜索" @onSearch="search"></KeWeiSearch>
注：按回车和点击搜索图标时会触发 onSearch
-->


<template>
    <div class="m-search">
        <Search class="search-icon pointer" @click="onSearch" />
        <input class="search-input text-inner-shadow inner-shadow inner-shadow-deep-hover" v-model="value"
            @keyup.enter="onSearch" :placeholder="placeholder" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps(['modelValue','placeholder'])
const emit = defineEmits(['update:modelValue', 'onSearch'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const onSearch = () =>{
    emit('onSearch', value)
}

onMounted(() => {

})
</script>

<style scoped>
.m-search {
    display:inline-block;
}

.search-input {
    width: 100%;
    height: 40px;
    outline: none;
    border: 0px;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 15px;
    color: #5c5c5c;
}

.search-icon {
    z-index: 999;
    width: 22px;
    height: 22px;
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #5c5c5c;
}

.search-icon:hover {
    color: var(--kw-color-text-blue);
}

.m-search:hover .search-icon{
    width: 20px;
    height: 20px;
    /* color: black; */
}

.m-search:hover .search-input{
    font-size: 96%;
}
</style>