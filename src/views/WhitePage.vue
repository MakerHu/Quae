<template>
    <h1>欢迎使用可微快速启动框架！这是一个空白页面，你可以在项目的/src/views/WhitePage.vue找到本页面并修改或删除。</h1>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const data = reactive({})

onMounted(() => {

})
</script>

<style scoped>

</style>