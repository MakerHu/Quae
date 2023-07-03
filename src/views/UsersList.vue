<template>
    <div class="shift">
        <div class="shift-btn pointer" :class="pageParams.role === 'ALL' ? 'inner-shadow' : 'my-shadow'"
            @click="onShift('ALL')">全部</div>
        <div class="shift-btn pointer" :class="pageParams.role === 'ADMIN' ? 'inner-shadow' : 'my-shadow'" @click="onShift('ADMIN')">
            管理</div>
        <div class="shift-btn pointer" :class="pageParams.role === 'USER' ? 'inner-shadow' : 'my-shadow'" @click="onShift('USER')">
            用户</div>
    </div>
    <KeWeiSearch class="search" v-model="pageParams.keywords" placeholder="搜索" @onSearch="search"></KeWeiSearch>
    <KeWeiTable class="tools-table my-shadow" :table-settings="tableSettings" :data="state.usersPage.records"
        @onOpenClick="onOpenClick" @onEditClick="onEditClick" @row-dblclick="onRowDbClick">
        <template #role="{ row, column, $index }">
            {{ roleDict[row[column.property]] }}
        </template>
        <template #createTime="{ row, column, $index }">
            {{ parserDate(row[column.property]) }}
        </template>
        <template #updateTime="{ row, column, $index }">
            {{ parserDate(row[column.property]) }}
        </template>
    </KeWeiTable>
    <KeWeiPagination class="page" v-model:current-page="pageParams.current" v-model:page-size="pageParams.size"
        :pager-count="pagerCount" :page-count="state.usersPage.pages" @update:current-page="handleCurrentChange" />
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUsersList } from '@/apis/UserApi'

import KeWeiTable from '@/components/KeWeiTable.vue'
import KeWeiPagination from '@/components/KeWeiPagination.vue'
import KeWeiSearch from '@/components/KeWeiSearch.vue'

const router = useRouter()

let pagerCount = ref(5)

const pageParams = reactive({
    current: 1,
    size: 13,
    keywords: '',
    role: 'ALL'
})

const roleDict = reactive({
    'ADMIN': '管理员',
    'USER': '普通用户',
})

const tableSettings = reactive({
    maxHeight: 'calc(100vh - 240px)',     // 表格的最大高度
    showOverflowTooltip: true,  // 内容过长时显示省略号并在鼠标滑过时提示
    operation: {            // 配置操作列，如果没有这个对象就不会出现操作列
        label: '操作',      // 列名
        fixed: 'right',     // 是否固定及固定位置
        // open: '预览',       // 是否显示内置的打开按钮，通过@onOpenClick使用
        edit: '编辑',       // 是否显示内置的编辑按钮，通过@onEditClick使用
        width: 57,         // 操作列宽度
    },
    firstColumn: {          // 配置第一列的内容，不配置则不显示
        label: '序号',      // 第一列名称
        type: 'index',      // 第一列类型：selection / index / expand
    },
    attributes: [           // 配置表头字段属性
        {
            label: '用户ID', // 字段名称
            prop: 'id',  // 字段对应的后端数据名
            fixed: false,   // 是否固定列
            // width: 100,  // 宽度
        },
        {
            label: '用户名',
            prop: 'uname',
            fixed: false,
            // width: 200,
        },
        {
            label: '邮箱',
            prop: 'email',
            fixed: false,
            // width: 200,
        },
        {
            label: '角色',
            prop: 'role',
            fixed: false,
            slot: true,     // 是否使用插槽，若开启，则具名插槽的名称为本字段的 prop
            // width: 200,
        },
        {
            label: '创建时间',
            prop: 'createTime',
            fixed: false,
            slot: true,     // 是否使用插槽，若开启，则具名插槽的名称为本字段的 prop
            // width: 200,
        },
        {
            label: '更新时间',
            prop: 'updateTime',
            fixed: false,
            slot: true,     // 是否使用插槽，若开启，则具名插槽的名称为本字段的 prop
            // width: 200,
        },
    ]
})

const state = reactive({
    usersPage: {}
})

const parserDate = (date) => {
    if (date) {
        var t = Date.parse(date)
        return new Date(t).Format("yyyy-MM-dd HH:mm:ss")
    } else {
        return ''
    }
}

// 表格相关函数
const onRowDbClick = (row, column, event) => {
    console.log('双击行', { row, column, event })
}

const handleClick = (params) => {
    console.log('外部按钮', params)
}

const onOpenClick = (params) => {
    console.log('内部打开', params.row.id)
}

const onEditClick = (params) => {
    console.log('内部编辑', params.row.id)
    router.push({ path: `/manage/users/${params.row.id}/profile/` })
}

// 分页相关函数
const handleCurrentChange = () => {
    getUsersList(pageParams).then((res) => {
        state.usersPage = res
    }).catch((err) => {
    })
}

const onShift = (role) => {
    pageParams.role = role
    search()
}

const search = (keywordStr) => {
    handleCurrentChange()
}

onMounted(() => {
    handleCurrentChange()
})

onUnmounted(() => {
})

</script>

<style scoped>
.shift {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
    /* width: 200px; */
    height: 41px;
    margin-right: 10px;
    border-radius: 10px;
    padding: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.shift-btn {
    height: 30px;
    width: 3.5em;
    padding: 5px 10px;
    margin: 3px 3px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.search {
    width: 300px;
    margin-bottom: 15px;
}

.tools-table {
    border-radius: 10px;
}

.t-btn {
    height: 100%;
    padding: 0 5px;
    margin: 3px 3px;
}

.page {
    margin-top: 30px;
    margin-bottom: 30px;
}
</style>