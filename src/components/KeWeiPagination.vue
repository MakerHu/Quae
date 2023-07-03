<!-- 使用方式如下
<KeWeiPagination class="page"
    v-model:current-page="pageParams.current"
    v-model:page-size="pageParams.size"
    :pager-count="pagerCount"
    :page-count="auditedToolsPage.pages"
    @update:current-page="handleCurrentChange" />
-->

<template>
    <div class="kewei-page">
        <el-pagination v-model:current-page="mCurrentPage" v-model:page-size="mPageSize"
            :pager-count="mPagerCount" :page-count="mPageCount"
            layout="prev, pager, next" />
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'

const props = defineProps(['currentPage', 'pageSize', 'pagerCount', 'pageCount'])
const emit = defineEmits(['update:currentPage','update:pageSize','update:pagerCount','update:pageCount'])

const mCurrentPage = computed({
    get() {
        return props.currentPage
    },
    set(value) {
        emit('update:currentPage', value)
    }
})

const mPageSize = computed({
    get() {
        return props.pageSize
    },
    set(value) {
        emit('update:pageSize', value)
    }
})

const mPagerCount = computed({
    get() {
        return props.pagerCount
    },
    set(value) {
        emit('update:pagerCount', value)
    }
})

const mPageCount = computed({
    get() {
        return props.pageCount
    },
    set(value) {
        emit('update:pageCount', value)
    }
})

onMounted(() => {

})
</script>

<style scoped>
.kewei-page {
    display: flex;
    justify-content: center;
}

:deep(.number),
:deep(.btn-next),
:deep(.btn-next)[disabled],
:deep(.btn-prev),
:deep(.btn-prev)[disabled],
:deep(.more) {
    /* background-color: #c40404; */
    margin: 3px;
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-high);
}

:deep(.number):active,
:deep(.btn-next):active,
:deep(.btn-next)[disabled]:active,
:deep(.btn-prev):active,
:deep(.btn-prev)[disabled]:active,
:deep(.more):active {

    background-color: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
    color: #5c5c5c;
}

:deep(.number):hover,
:deep(.btn-next):hover,
:deep(.btn-next)[disabled]:hover,
:deep(.btn-prev):hover,
:deep(.btn-prev)[disabled]:hover,
:deep(.more):hover {

    background-color: var(--kw-color-background);
    color: #5c5c5c;
}

:deep(.el-pager .is-active) {
    color: var(--kw-color-text-blue);
    text-shadow: var(--kw-text-inner-shadow);
  box-shadow: var(--kw-box-shadow-low);
}

:deep(.el-pager .is-active):active {
    color: var(--kw-color-text-blue);
    text-shadow: var(--kw-text-inner-shadow);
}

:deep(.btn-prev.is-first)[disabled],
:deep(.btn-next.is-last)[disabled]
 {
    color: #a8abb2;
    box-shadow: var(--kw-box-shadow-high);
}
</style>