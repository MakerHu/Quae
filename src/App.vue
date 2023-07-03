<template>
    <router-view></router-view>  
</template>

<script setup>
import { onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const saveState = () => {
    sessionStorage.setItem('state', JSON.stringify(store.state))
}

onMounted(() => {
    window.addEventListener('unload', saveState)
})
</script>

<style scoped>
</style>
