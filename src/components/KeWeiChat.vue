<template>
    <div class="chat-panel" v-show="showChat">
        <KeWeiButton class="chat-refresh-btn" @click="reStartChat">
            <el-icon>
                <RefreshLeft />
            </el-icon>
        </KeWeiButton>
        <KeWeiButton class="chat-close-btn" @click="showChat = !showChat">
            <el-icon>
                <Minus />
            </el-icon>
        </KeWeiButton>
        <div class="chat-title text-inner-shadow">可微助手<span class="reply-tip">{{ replying ? '（正在输入...）':'' }}</span></div>
        <div class="chat-window">
            <div class="msg-panel inner-shadow">
                <div class="msg-block" :class="msg.role" v-for="msg in state.msgs">
                    <KeWeiMarkdown class="bubble my-shadow" v-model="msg.content"></KeWeiMarkdown>
                </div>
            </div>
            <div class="send-panel">
                <textarea class="input-area inner-shadow" v-model="msgToSent.content"
                    @keydown="handleKeyCode($event)"></textarea>
            </div>
        </div>
    </div>

    <KeWeiButton class="chat-open-btn" @click="showChat = !showChat">
        <el-icon>
            <ChatDotRound />
        </el-icon>
    </KeWeiButton>
</template>

<script setup>
import { ref, reactive, markRaw, onMounted, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { askChatGpt } from '@/apis/CustomerServiceApi'

import KeWeiButton from '@/components/KeWeiButton.vue'
import KeWeiMarkdown from '@/components/KeWeiMarkdown.vue'

const showChat = ref(false)
const replying = ref(false)

const msgToSent = {
    role: 'user',
    content: ''
}

const state = reactive({
    msgs: [
        {
            role: 'assistant',
            content: '你好呀！有什么问题都能问我哦~'
        },
    ]
})

const handleKeyCode = (event) => {
    if (event.keyCode === 13) {
        if (!event.shiftKey) {
            event.preventDefault();
            handleTextSend();
        }
    }
}

const handleTextSend = () => {
    if (!msgToSent.content) {
        tipMsg('warning', '不能发送空白内容！')
        return
    }
    state.msgs.push(JSON.parse(JSON.stringify(msgToSent)))

    let questions = []
    let i = 0;
    if (state.msgs.length >= 6) i = 5
    for (; i >= 0; i--) {
        questions.push(state.msgs[state.msgs.length - 1 - i])
    }
    replying.value = true
    askChatGpt(questions).then(res => {
        state.msgs.push(reactive(res))
        replying.value = false
        nextTick(() => {
            scrollToBottom()
        })
    }).catch(err => {
    })

    msgToSent.content = ''

    nextTick(() => {
        scrollToBottom()
    })
}

const reStartChat = () => {
    state.msgs = [
        {
            role: 'assistant',
            content: '你好呀！开始新的聊天吧~'
        },
    ]
}

const scrollToBottom = () => {
    const domWrapper = document.querySelector('.msg-panel'); // 外层容器 出现滚动条的dom
    (function smoothscroll() {
        const currentScroll = domWrapper.scrollTop;   // 已经被卷掉的高度
        const clientHeight = domWrapper.offsetHeight; // 容器高度
        const scrollHeight = domWrapper.scrollHeight; // 内容总高度
        if (scrollHeight - 10 > currentScroll + clientHeight) {
            window.requestAnimationFrame(smoothscroll);
            domWrapper.scrollTo(0, currentScroll + (scrollHeight - currentScroll - clientHeight) / 2);
        }
    })();
}

const tipMsg = (type, msg) => {
    ElMessage({
        message: msg,
        offset: 30,
        type: type,
    })
}

onMounted(() => {

})
</script>

<style scoped>
.chat-title {
    color: var(--kw-color-text-blue);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 30px;
    font-size: large;
}

.reply-tip {
    font-size: small;
}

.chat-window {
    height: calc(100% - 30px);
}

.chat-panel {
    z-index: 999;
    width: 45%;
    height: 60%;
    /* width: 800px;
    height: 600px; */
    padding: 5px 15px 15px 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background: var(--kw-color-background);
    box-shadow: 29px 29px 58px #c4c4c4,
        -29px -29px 58px #ffffff;
    animation: morewrap 0.5s ease;
}

@keyframes morewrap {
    0% {
        transform: translate(-50%, 0%);
        box-shadow: var(--kw-box-shadow-high);
    }

    100% {
        transform: translate(-50%, -50%);
        box-shadow: 29px 29px 58px #c4c4c4,
            -29px -29px 58px #ffffff;
    }
}

.chat-open-btn {
    z-index: 999;
    position: absolute;
    right: 50px;
    bottom: 50px;
    border-radius: 50%;
}

.chat-close-btn {
    z-index: 999;
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

.chat-refresh-btn {
    z-index: 999;
    position: absolute;
    right: 35px;
    top: 5px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
}

.msg-panel {
    height: calc(70% - 5px);
    border-radius: 10px;
    padding: 10px;
    overflow: auto;
    margin-bottom: 5px;
}

.send-panel {
    height: 30%;
    border-radius: 10px;
}

.input-area {
    width: 100%;
    height: 100%;
    padding: 15px;
    border: none;
    border-radius: 10px;
    outline: none;
    resize: none;
}

.msg-block {
    display: flex;
    margin-bottom: 20px;
}

.user {
    /* background-color: aqua; */
    justify-content: right;
}

.bubble {
    border-radius: 10px;
    max-width: 48%;
    padding: 5px;
}

.user .bubble {
    background-color: #9debb7;
}
</style>