<template>
    <div class="demo-container shadow-low">
        <h2>按钮组件</h2>
        <div class="base-panel">
            <KeWeiButton class="demo-btn" type="high-low" @click="onBtnClick">高低按钮</KeWeiButton>
            <KeWeiButton class="demo-btn" type="high-shallow" @click="onBtnClick">凹凸按钮</KeWeiButton>
            <KeWeiButton class="demo-btn" type="low-shallow" @click="onBtnClick">浅凹凸按钮</KeWeiButton>
            <KeWeiButton class="demo-btn" type="flat-shallow" @click="onBtnClick">内陷按钮</KeWeiButton>
        </div>
        <el-divider />

        <h2>Switch开关</h2>
        <div class="base-panel">
            <KeWeiSwitch v-model="switchValue" @change="onSwitchChange"></KeWeiSwitch>
            {{ switchValue }}
        </div>
        <el-divider />

        <h2>输入框</h2>
        <div class="base-panel">
            <h3>普通用法</h3>
            <KeWeiInput v-model="inputValue" placeholder="请输入" @onEnterKey="onInputEntry" />
            <h3>禁止编辑</h3>
            <KeWeiInput v-model="inputValue" placeholder="不可编辑" disabled @onEnterKey="onInputEntry" />
            <h3>左侧带图标</h3>
            <KeWeiInput v-model="inputValue" icon="User" placeholder="请输入" @onEnterKey="onInputEntry" />
            <h3>右侧带图标</h3>
            <KeWeiInput v-model="inputValue" :iconRight="true" icon="User" placeholder="请输入" @onEnterKey="onInputEntry" />
            <h3>输入文字位置（left, center, right）</h3>
            <KeWeiInput v-model="inputValue" :iconRight="true" textAlign="right" icon="User" placeholder="请输入"
                @onEnterKey="onInputEntry" />
            <h3>密码</h3>
            <KeWeiInput v-model="inputValue" type="password" icon="Lock" placeholder="密码" @onEnterKey="onInputEntry" />
        </div>
        <el-divider />

        <h2>搜索框</h2>
        <div class="base-panel">
            <KeWeiSearch class="search" v-model="searchKeyword" placeholder="搜索" @onSearch="onSearch"></KeWeiSearch>
        </div>
        <el-divider />

        <h2>表格组件</h2>
        <div class="base-panel">
            <KeWeiTable class="demo-table shadow-high" :table-settings="tableSettings" :data="tableData"
                @onOpenClick="onOpenClick" @onEditClick="onEditClick" @row-dblclick="onRowDbClick">
                <template #default="{ row, column, $index }">
                    <el-icon class="icon-btn pointer" @click="handleClick({ row, column, $index })">
                        <EditPen />
                    </el-icon>
                    <el-icon class="icon-btn pointer" @click="handleClick({ row, column, $index })">
                        <Edit />
                    </el-icon>
                </template>
                <template #attr3="{ row, column, $index }">
                    <el-tag>{{ row[column.property] }}</el-tag>
                </template>
            </KeWeiTable>
        </div>
        <el-divider />

        <h2>分页组件</h2>
        <div class="base-panel">
            <KeWeiPagination class="page" v-model:current-page="pageParams.current" v-model:page-size="pageParams.size"
                :pager-count="pagerCount" :page-count="10" @update:current-page="handleCurrentChange" />
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import KeWeiTable from '@/components/KeWeiTable.vue'
import KeWeiButton from '@/components/KeWeiButton.vue'
import KeWeiInput from '@/components/KeWeiInput.vue'
import KeWeiSearch from '@/components/KeWeiSearch.vue'
import KeWeiSwitch from '@/components/KeWeiSwitch.vue'
import KeWeiPagination from '@/components/KeWeiPagination.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

/* 按钮相关代码-start */
const onBtnClick = () => {
    message('点击了按钮组件')
}
/* 按钮相关代码-end */

/* switch开关相关代码-start */
const switchValue = ref(false)
const onSwitchChange = (newValue) => {
    message('当前开关状态：' + newValue)
}
/* switch开关相关代码-end */

/* 输入框相关代码-start */
const inputValue = ref('')
const onInputEntry = () => {
    message('触发输入框')
}
/* 输入框相关代码-end */

/* 搜索框相关代码-start */
const searchKeyword = ref('')
const onSearch = (keyword) => {
    message('触发搜索框：' + keyword)
}

/* 搜索框相关代码-end */

/* 表格相关代码-start */
const tableSettings = reactive({
    maxHeight: 500,     // 表格的最大高度
    showOverflowTooltip: true,  // 内容过长时显示省略号并在鼠标滑过时提示
    operation: {            // 配置操作列，如果没有这个对象就不会出现操作列
        label: '操作',      // 列名
        fixed: 'right',     // 是否固定及固定位置
        open: '打开',       // 是否显示内置的打开按钮，通过@onOpenClick使用
        edit: '编辑',       // 是否显示内置的编辑按钮，通过@onEditClick使用
        width: 140,         // 操作列宽度
    },
    firstColumn: {          // 配置第一列的内容，不配置则不显示
        label: '序号',      // 第一列名称
        type: 'index',      // 第一列类型：selection / index / expand
    },
    attributes: [           // 配置表头字段属性
        {
            label: '字段1（靠左固定）', // 字段名称
            prop: 'attr1',  // 字段对应的后端数据名
            fixed: true,   // 是否固定列
            // width: 100,  // 宽度
        },
        {
            label: '字段2',
            prop: 'attr2',
            fixed: false,
            // width: 200,
        },
        {
            label: '字段3',
            prop: 'attr3',
            fixed: false,
            slot: true,
            // width: 200,
        },
        {
            label: '字段4',
            prop: 'attr4',
            fixed: false,
            // width: 200,
        },
        {
            label: '字段5',
            prop: 'attr5',
            fixed: false,
            // width: 200,
        },
    ],
})

const tableData = reactive([   // 数据记录（这是写死的用来模拟，具体根据业务场景从后端获取）
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
    {
        attr1: '这是字段1的数据',
        attr2: '这是字段2的数据',
        attr3: '单元格插槽',
        attr4: '这是字段4的数据',
        attr5: '这是字段5的数据',
    },
])

const onRowDbClick = (row, column, event) => {
    message('打开控制台查看输出')
    console.log('双击行', { row, column, event })
}

const handleClick = (params) => {
    message('打开控制台查看输出')
    console.log('编辑', params)
}

const onOpenClick = (params) => {
    message('打开控制台查看输出')
    console.log('内部打开', params.row.attr1)
}

const onEditClick = (params) => {
    message('打开控制台查看输出')
    console.log('内部编辑', params)
}
/* 表格相关代码-end */

/* 分页相关代码-start */
let pagerCount = ref(5)

const pageParams = reactive({
    current: 1,     //当前页
    size: 13
})

const handleCurrentChange = (currentPage) => {
    message('当前页：' + currentPage)
}
/* 分页相关代码-end */

const message = (msg) => {
    ElMessage({
        message: msg,
        offset: 30
    })
}

onMounted(() => {

})
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}

h3 {
    margin: 10px 0;
}

.demo-container {
    padding: 20px;
    border-radius: 10px;
}

.base-panel {
    /* display: flex;
    justify-content: center; */
    padding: 20px;
    border-radius: 10px;
    box-shadow: var(--kw-inner-shadow-shallow);
}

.demo-btn {
    margin: 3px;
}

.icon-btn {
    /* padding: 2px;
    margin: 0 5px; */
    margin: 0 5px;
}

.demo-table {
    border-radius: 10px;
}
</style>