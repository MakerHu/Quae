<template>
    <div class="kw-markdown-container" v-html="markdownToHtml"></div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import "highlight.js/styles/github.css"

marked.use({
    langPrefix: 'code-block hljs language-',
    renderer: new marked.Renderer(),
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    },
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    // xhtml: false,

    mangle: false,
    headerIds: false,
});

// marked.use({
//     gfm: true,
//     mangle: false,
//     headerIds: false,
// });

const props = defineProps(['modelValue'])

const markdownToHtml = computed({
    get() {
        return marked.parse(props.modelValue ? props.modelValue : '')
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

onMounted(() => {

})
</script>

<style scoped>
/* 对话中代码块的样式 */
:deep(pre) {
    padding: 5px;
    border-radius: 5px;
    /* background-color: var(--kw-color-background); */
    /* background-color: transparent; */
    background-color: rgba(255,255,255,0.2);
    box-shadow: var(--kw-inner-shadow-shallow);
    font-size: 96%;
    overflow: auto;
}

/* 对话中代码块的样式 */
:deep(pre .code-block) {
    /* border-radius: 5px; */
    background-color: transparent;
    /* font-size: 96%; */
}

/* 对话中代码块的样式 */
:deep(code):not(pre code) {
    background-color: #d0d4d2;
    border-radius: 3px;
    padding: 1px 3px;
    margin: auto 2px;
}
</style>