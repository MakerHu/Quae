<!-- 
    使用方式如下：
    <KeWeiTable class="m-table my-shadow"
    :table-settings="tableSettings"
    :data="tableData"
    @onOpenClick="onOpenClick"
    @onEditClick="onEditClick"
    @row-dblclick="onRowDbClick">
        <template #default="{ row, column, $index }">
            <div class="t-btn btn btn-hover" @click="handleClick({ row, column, $index })">按钮</div>
        </template>
        <template #attr1="{ row, column, $index }">
            <strong>{{ row[column.property] }}</strong>
        </template>
    </KeWeiTable>

    // 表格的配置属性
    tableSettings = reactive({
    maxHeight: 'calc(100vh - 260px)',     // 表格的最大高度
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
            slot: true,     // 是否使用插槽，若开启，则具名插槽的名称为本字段的 prop
            // width: 100,  // 宽度（一般不用配置，默认自适应调整）
        },
        {
            label: '字段2',
            prop: 'attr2',
            fixed: false,
            // width: 200,
        }
    ]
}) -->

<template>
    <el-table class="kewei-table" :data="data" :max-height="tableSettings.maxHeight" tooltip-effect="light" empty-text="无数据"
        :row-style="rowStyle" :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle"
        @row-dbclick="onRowDbClick">
        <el-table-column v-if="tableSettings.firstColumn" fixed="left" :label="tableSettings.firstColumn.label"
            :type="tableSettings.firstColumn.type" />
        <el-table-column v-for="(item, index) in tableSettings.attributes" :prop="item.prop" :label="item.label"
            :width="item.width" :fixed="item.fixed" :show-overflow-tooltip="tableSettings.showOverflowTooltip">
            <template v-if="item.slot" #default="{ row, column, $index }">
                <slot :name="item.prop" :row="row" :column="column" :$index="$index"></slot>
            </template>
        </el-table-column>
        <el-table-column v-if="tableSettings.operation" :fixed="tableSettings.operation.fixed"
            :label="tableSettings.operation.label" :width="tableSettings.operation.width">
            <template #default="{ row, column, $index }">
                <KeWeiButton class="btn" v-if="tableSettings.operation.open"
                    @click="handleClick('onOpenClick', { row, column, $index })">{{ tableSettings.operation.open }}</KeWeiButton>
                <KeWeiButton class="btn" v-if="tableSettings.operation.edit"
                    @click="handleClick('onEditClick', { row, column, $index })">{{ tableSettings.operation.edit }}</KeWeiButton>
                <slot :row="row" :column="column" :$index="$index"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { onMounted } from 'vue'
import KeWeiButton from '@/components/KeWeiButton.vue'

const emit = defineEmits(['onOpenClick', 'onEditClick', 'rowDbclick'])

const props = defineProps({
    tableSettings: {
        type: Object,
        required: true
    },
    data: {
        type: Array,
        required: true
    }
})

const handleClick = (operation, params) => {
    emit(operation, params)
}

const onRowDbClick = (params) => {
    emit('rowDbclick', params)
}

const rowStyle = (obj) => {
    return {
        'background': 'var(--kw-color-background)',
        'box-shadow': 'var(--mt-box-inner-shadow)'
    }
}

const headerRowStyle = (obj) => {
    return {
        'height': '40px',
        'background-color': 'var(--kw-color-background)',
        'color': 'black',
        'font-size': '13px',
        'text-shadow': 'var(--kw-text-inner-shadow)'
    }
}

const headerCellStyle = (obj) => {
    return {
        'background': 'var(--kw-color-background)',
        'box-shadow': 'var(--mt-box-inner-shadow)',
    }
}

onMounted(() => {

})
</script>

<style scoped>
.kewei-table {
    --mt-box-inner-shadow: inset 1px 1px 2px #c9c9c9,
        inset -1px -1px 2px #ffffff;
}

:deep(.el-table__body, .el-table__footer, .el-table__header) {
    background-color: var(--kw-color-background);
    text-shadow: var(--kw-text-inner-shadow);
}

:deep(.el-table__body-wrapper tr td.el-table-fixed-column--left),
:deep(.el-table__body-wrapper tr td.el-table-fixed-column--right) {
    background: var(--kw-color-background);
    /* background: transparent; */
    box-shadow: var(--mt-box-inner-shadow);
}

:deep(.el-table__body-wrapper tr.hover-row):hover>td {
    background-color: var(--kw-color-background);
    box-shadow: 0px 2px 2px #c9c9c9,
        0px -2px 2px #ffffff;
}

.btn {
    height: 20px;
    padding: 0 5px;
    margin: 3px 3px;
}
</style>