<template>
    <div class="common-layout">
        <el-container class="base-container">
            <el-header class="m-header">
                <QuaeHeadNav :has-search="true"></QuaeHeadNav>
            </el-header>
            <el-main class="m-main">
                <el-page-header class="goback" v-if="!(route.meta.goBack === false)" @back="goBack" icon="ArrowLeftBold">
                    <template #title>
                        <span>返回</span>
                    </template>
                    <template #content>
                        <span>{{ route.meta.title }}</span>
                    </template>
                </el-page-header>
                <router-view></router-view>
            </el-main>
            <!-- <el-footer class="m-footer">©可微</el-footer> -->
        </el-container>
    </div>
    <el-backtop class="m-backtop shadow-high" target=".m-main" :right="100" :bottom="50" />
</template>

<script setup>
import QuaeHeadNav from '@/components/QuaeHeadNav.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.common-layout {
    height: 100vh;
    width: 100vw;
}

.base-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.m-header {
    z-index: 999;
    background: var(--quae-color-background);
    box-shadow: var(--quae-box-shadow-high);
    position: sticky;
    top: 0;
}

.m-aside {
    z-index: 998;
    width: auto;
    background: var(--quae-color-background);
    box-shadow: var(--quae-box-shadow-high);
}

.m-main {
    /* background: #f0f0f0; */
    background: var(--quae-color-background);
    box-shadow: inset 2px 2px 4px #c9c9c9,
        inset -2px -2px 4px #ffffff;
}

.m-footer {
    background: var(--quae-color-background);
}

.m-backtop:active {
    background: var(--quae-color-background);
    box-shadow: var(--quae-inner-shadow-shallow);
}

.m-backtop:hover {
    background: var(--quae-color-background);
}

.goback {
    margin-bottom: 20px;
}
</style>