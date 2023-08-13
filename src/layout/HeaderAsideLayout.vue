<template>
    <div class="common-layout">
        <el-container class="base-container">
            <el-header class="m-header">
                <QuaeHeadNav :has-search="true"></QuaeHeadNav>
            </el-header>
            <el-container>
                <el-aside class="m-aside">
                    <QuaeAsideMenu></QuaeAsideMenu>
                </el-aside>
                <el-container>
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
                    <!-- <el-footer class="m-footer">Footer</el-footer> -->
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
  
<script setup>
import QuaeAsideMenu from '@/components/QuaeAsideMenu.vue'
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
    height: calc(100vh - 60px);
    overflow: auto;
}

.m-footer {
    background: var(--quae-color-background);
}

.goback {
    margin-bottom: 20px;
}
</style>
  