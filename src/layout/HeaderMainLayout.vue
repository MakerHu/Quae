<template>
    <div class="common-layout">
        <el-container class="base-container">
            <el-header class="m-header">
                <KeWeiHeadNav :has-search="true"></KeWeiHeadNav>
            </el-header>
            <el-main class="m-main">
                <router-view></router-view>
            </el-main>
            <!-- <el-footer class="m-footer">©可微</el-footer> -->
        </el-container>
    </div>
    <el-backtop class="m-backtop my-shadow" target=".m-main" :right="100" :bottom="50" />
</template>

<script setup>
import KeWeiHeadNav from '@/components/KeWeiHeadNav.vue'
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
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-high);
    position:sticky;
    top: 0;
}

.m-aside {
    z-index: 998;
    width: auto;
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-high);
}

.m-main {
    /* background: #f0f0f0; */
    background: var(--kw-color-background);
    box-shadow: inset 2px 2px 4px #c9c9c9,
        inset -2px -2px 4px #ffffff;
}

.m-footer {
    background: var(--kw-color-background);
}

.m-backtop:active {
    background: var(--kw-color-background);
    box-shadow: var(--kw-inner-shadow-shallow);
}

.m-backtop:hover {
    background: var(--kw-color-background);
}
</style>