<template>
    <div>
        <el-empty class="empty" description="没找着欸~" v-if="state.myToolsPage.total === 0" />
        <div class="tools-panel">
            <div class="tool-card my-shadow my-shadow-hover pointer" v-for="tool in state.myToolsPage.records"
                @click="useTool(tool.id)">
                <div class="img-panel inner-shadow-deep inner-shadow-hover">
                    <!-- <img class="tool-img" :src="'http://static.simpledesktops.com/uploads/desktops/2015/07/11/Yosemite-Color-Block.png.295x184_q100.png'" :alt="tool.toolName"> -->
                    <img class="tool-img my-shadow my-shadow-hover" :src="'/api/file/files/' + tool.imageUrl"
                        :alt="tool.toolName" v-if="!!tool.imageUrl">
                    <div class="default-img test-inner-shadow my-shadow my-shadow-hover" v-else>{{ tool.toolName }}</div>
                </div>
                <div class="desc-panel">
                    <!-- <div class="dev-name text-inner-shadow">by {{ tool.devName }}</div> -->
                    <div class="tool-name text-inner-shadow">{{ tool.toolName }}</div>
                    <div class="tool-desc text-inner-shadow">{{ tool.toolDesc }}</div>
                </div>
            </div>
        </div>

        <KeWeiPagination class="page" v-model:current-page="pageParams.current" v-model:page-size="pageParams.size"
            :pager-count="pagerCount" :page-count="state.myToolsPage.pages" @update:current-page="handleCurrentChange" />
    </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import emitter from '@/bus/eventBus'
import { ElMessage } from 'element-plus'
import { getToolsPage } from '@/apis/ToolApi'

import KeWeiPagination from '@/components/KeWeiPagination.vue'

const store = useStore()
const router = useRouter()

let pagerCount = ref(5)

let pageParams = reactive({
    current: 1,
    size: 28,
    keywords: '',
    status: 1
})

const state = reactive({
    myToolsPage: {}
})

const keyword = computed(() => {
    return store.getters['common/getKeyword']
})

const handleCurrentChange = () => {
    pageParams.keywords = keyword.value
    getToolsPage(pageParams).then((res) => {
        state.myToolsPage = res
    }).catch((err) => {
    })
}

const search = (keywordStr) => {
    handleCurrentChange()
}

const useTool = (toolId) => {
    if (!toolId) {
        ElMessage({
            message: '呀！工具丢了捏~',
            offset: 30,
            type: 'warning',
        })
    } else {
        router.push(`/tools/${toolId}`)
    }
}

onMounted(() => {
    emitter.on('searchEvent', search)
    handleCurrentChange()
})

onUnmounted(() => {
    emitter.off('searchEvent', search)
})
</script>

<style scoped>

.tools-panel {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
}

.tool-card {
    margin: 20px 10px;
    width: 225px;
    height: 192px;
    border-radius: 5px;
    /* float: left; */
    padding: 5px
}

.img-panel {
    width: 100%;
    padding: 5px;
    height: 134px;
    border-radius: 3px;
    display: flex;
    justify-content: center;
}

.tool-img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
}

.tool-img:hover {
    width: 99.8%;
    height: 99.5%;
}

.default-img {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: rgb(133, 133, 133);
    border-radius: 3px;
}

.default-img:hover {
    font-size: 19px;
}

.desc-panel {
    /* color: rgba(134, 134, 134, 0.7); */
    color: rgba(77, 77, 77, 0.7);
}

.tool-name {
    font-weight: 550;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.dev-name {
    float: right;
}

.tool-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.page {
    margin-top: 30px;
    margin-bottom: 30px;
}</style>