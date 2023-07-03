<template>
    <code-mirror class="kw-cm-panel" v-model="codeValue" basic :lang="lang" :phrases="phrases" :placeholder="placeholder"
        :tab="true" />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import CodeMirror from 'vue-codemirror6';
import { html } from '@codemirror/lang-html'
import { markdown } from '@codemirror/lang-markdown'

const props = defineProps(['modelValue', 'placeholder', 'lang'])
const emit = defineEmits(['update:modelValue'])

const htmlLang = html()
const markdownLang = markdown()

const codeValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const lang = computed(() => {
    if (props.lang === 'html') return htmlLang
    else if (props.lang === 'markdown') return markdownLang
})

const phrases = ref({
    // @codemirror/view
    'Control character': '控制字符',
    // @codemirror/commands
    'Selection deleted': '选择删除',
    // @codemirror/language
    'Folded lines': '折叠',
    'Unfolded lines': '展开',
    to: '目的地',
    'folded code': '折叠',
    unfold: '展开',
    'Fold line': '折叠',
    'Unfold line': '展开',
    // @codemirror/search
    'Go to line': '跳到行',
    go: 'OK',
    Find: '查找',
    Replace: '替换为',
    next: '下一个',
    previous: '上一个',
    all: '全部',
    'match case': '条件',
    'by word': '整词',
    regexp: '正则',
    replace: '替换',
    'replace all': '全部替换',
    close: '关闭',
    'current match': '当前匹配',
    'replaced $ matches': '替换 $ 匹配项',
    'replaced match on line $': '替换匹配的 $ 行',
    'on line': 'on line',
    // @codemirror/autocomplete
    Completions: '自動補完',
    // @codemirror/lint
    Diagnostics: '错误',
    'No diagnostics': '没有错误',
});

onMounted(() => {

})
</script>

<style scoped>
.kw-cm-panel {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
    border-radius: 10px;
    height: 100%;
    overflow: auto;
}

:deep(.cm-focused) {
    outline: none;
}

/* 数字列样式 */
:deep(.cm-gutters) {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
    /* border-radius: 10px; */
}

:deep(.cm-editor) {
    height: 100%;
    border-radius: 10px;
}

:deep(.cm-scroller) {
    height: 100%;
    border-radius: 10px;
}

:deep(.cm-search) {
    background: var(--kw-color-background);
}

:deep(input.cm-textfield) {
    background: var(--kw-color-background);
    box-shadow: var(--kw-inner-shadow-shallow);
    outline: none;
    border: 0px;
    border-radius: 10px;
}

:deep(input.cm-textfield):hover {
    box-shadow: var(--kw-inner-shadow-deep);
}

:deep(.cm-button) {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
    border-radius: 3px;
    border: 0px;
}

:deep(.cm-button):focus {
    background: var(--kw-color-background);
    box-shadow: var(--kw-inner-shadow-shallow);
}

:deep(.cm-button):hover {
    cursor: pointer;
}

:deep(.cm-activeLineGutter) {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
}

:deep(.cm-search) {
    background: var(--kw-color-background);
    box-shadow: var(--kw-box-shadow-low);
}

:deep(.cm-tooltip-autocomplete) {
    z-index: 9999;
}
</style>