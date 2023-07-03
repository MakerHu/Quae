<template>
    
    <el-page-header class="goback" @back="goBack" icon="ArrowLeftBold">
        <template #title>
            <span>返回</span>
        </template>
        <template #content>
            <span>{{ route.meta.title }}</span>
        </template>
    </el-page-header>
    <div class="base-panel">
        <div>
            <KeWeiTable class="m-table my-shadow" :table-settings="tableSettings" :data="tableData"
                @onOpenClick="onOpenClick" @onEditClick="onEditClick" @row-dblclick="onRowDbClick">
                <template #default="{ row, column, $index }">
                    <div class="t-btn btn btn-hover" @click="handleClick({ row, column, $index })">按钮</div>
                </template>
            </KeWeiTable>
        </div>
    </div>
    <div class="base-panel">
        <div class="code-panel">
            <div>{{ codeValue }}</div>
            <KeWeiCodemirror v-model="codeValue" lang="markdown" placeholder="请输入"></KeWeiCodemirror>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import KeWeiTable from '@/components/KeWeiTable.vue'
import KeWeiCodemirror from '@/components/KeWeiCodemirror.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const codeValue = ref('')

const goBack = () => {
    router.back()
}

const tableSettings = reactive({
    maxHeight: 500,     // 表格的最大高度
    showOverflowTooltip: true,  // 内容过长时显示省略号并在鼠标滑过时提示
    operation: {            // 配置操作列，如果没有这个对象就不会出现操作列
        label: '操作',      // 列名
        fixed: 'right',     // 是否固定及固定位置
        open: '打开',       // 是否显示内置的打开按钮，通过@onOpenClick使用
        edit: '编辑',       // 是否显示内置的编辑按钮，通过@onEditClick使用
        width: 130,         // 操作列宽度
    },
    firstColumn: {          // 配置第一列的内容，不配置则不显示
        label: '序号',      // 第一列名称
        type: 'index',      // 第一列类型：selection / index / expand
    },
    attributes: [           // 配置表头字段属性
        {
            label: '字段1', // 字段名称
            prop: 'attr1',  // 字段对应的后端数据名
            fixed: false,   // 是否固定列
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
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
    {
        attr1: '是独立访客safdasadfsad',
        attr2: '阿斯顿噶时光',
        attr3: 'ds方法',
        attr4: '撒旦给',
        attr5: 's打发撒旦飞洒多发点发',
    },
])

const onRowDbClick = (row, column, event) => {
    console.log('双击行', { row, column, event })
}

const handleClick = (params) => {
    console.log('编辑', params)
}

const onOpenClick = (params) => {
    params.value
    console.log('内部打开', params.row.attr1)
}

const onEditClick = (params) => {
    console.log('内部编辑', params)
}

onMounted(() => {

})
</script>

<style scoped>
.base-panel {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.m-table {
    width: 800px
        /* width: 100%; */
}

.t-btn {
    padding: 2px;
    margin: 0 5px;
}

.code-panel {
    width: 800px;
    height: 500px;
}
</style>