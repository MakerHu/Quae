<template>
    <nav class="container">
        <div class="left">
            <div class="logo text-inner-shadow pointer text-none-select" @click="onLogoClick()">
                <img class="logo-img" src="../assets/logo.svg" alt="logo" width="35" height="35">
                <span>Quae-魁</span>
            </div>
        </div>
        <div class="center">
            <QuaeSearch class="search" v-if="hasSearch" v-model="keyword" placeholder="搜索" @onSearch="onSearch">
            </QuaeSearch>
        </div>
        <div class="right">
            <QuaeSwitch @change="shitchDarkMode">
                <template #on><q-icon name="sun" size="1em" /></template>
                <template #off><q-icon name="moon" size="1em" /></template>
            </QuaeSwitch>
            <div class="avatar pointer">
                <div class="username shadow-high text-none-select" @click="onAvatarClick()">
                    {{ username }}
                </div>
            </div>
            <div class="more shadow-high" v-show="showMore">
                <div>
                    <QuaeButton class="more-btn" type="low-shallow" @click="onLoginClick()">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</QuaeButton>
                </div>
                <div>
                    <QuaeButton class="more-btn" type="low-shallow" @click="onProfileClick()">个人中心</QuaeButton>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { pinyin } from 'pinyin-pro'
import emitter from '@/bus/eventBus'
import QuaeSearch from '@/components/QuaeSearch.vue'
import QuaeButton from '@/components/QuaeButton.vue'
import QuaeSwitch from "@/components/QuaeSwitch.vue"

const store = useStore()
const router = useRouter()

let keyword = ref('')
let showMore = ref(false)

defineProps({
    hasSearch: {
        type: Boolean,
        default: false
    }
})

const isDarkModeInWeb = () => {
  return document.getElementsByTagName('body')[0].classList.value.includes("dark");
}

const shitchDarkMode = () => {
    if(isDarkModeInWeb()) {
        document.getElementsByTagName("body")[0].classList.remove("dark"); // 删除dark类
    } else {
        document.getElementsByTagName("body")[0].classList.add("dark"); // 添加dark类
    }
}

const username = computed(() => {
    let uname = store.getters['authority/getUser'].uname
    // 获取数组形式不带声调的拼音
    let unamePinyin = pinyin(uname, { toneType: 'none', type: 'array' });
    uname = ''
    if (unamePinyin[0]) {
        uname += unamePinyin[0].charAt(0)
    }

    if (unamePinyin[1]) {
        uname += unamePinyin[1].charAt(0)
    }

    if (unamePinyin[2]) {
        uname += unamePinyin[2].charAt(0)
    }
    return uname.toUpperCase()
})

const keywordStroe = computed(() => {
    return store.getters['common/getKeyword']
})

const onLogoClick = () => {
    router.push('/tools')
}

const onAvatarClick = () => {
    showMore.value = !showMore.value
}

const onLoginClick = () => {
    router.push('/login')
}

const onProfileClick = () => {
    router.push('/user/profile')
}

const onSearch = () => {
    store.dispatch('common/asyncUpdateKeyword', keyword.value)
    emitter.emit('searchEvent', keyword.value)
    if (keyword.value !== '') {
        router.push('/tools')
    }
}

onMounted(() => {
    keyword.value = keywordStroe.value ? keywordStroe.value : ''
})

</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 100%;
    height: 100%;
}

.left {
    width: 30%;
    display: flex;
    justify-content: left;
}

.center {
    width: 30%;
    display: flex;
    justify-content: center;
}

.right {
    width: 30%;
    display: flex;
    justify-content: right;
    align-items: center;
}

.logo {
    height: 60px;
    color: var(--quae-color-text-blue);
    font-size: 28px;
    display: flex;
    justify-content: left;
    align-items: center;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.logo-img {
    margin-right: 5px;
}

.search {
    margin: 0 auto;
    width: 100%;
}

.avatar {
    width: 50px;
    height: 50px;
    margin-left: 10px;
}

.username {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: large;
    color: var(--quae-color-text-blue);
    text-shadow: var(--quae-text-inner-shadow);
}

.username:active {
    background: var(--quae-color-background);
    box-shadow: var(--quae-inner-shadow-shallow);
    font-size: 17px;
}

.more {
    z-index: 999;
    width: 7em;
    padding: 5px 5px 0px 5px;
    position: absolute;
    top: 70px;
    right: 0;
    border-radius: 5px;
    animation: morewrap 0.2s ease;
}

@keyframes morewrap {
    0% {
        transform: translateY(-20%);
    }

    100% {
        transform: translateY(0%);
    }
}

.more-btn {
    height: 30px;
    margin-bottom: 5px;
    width: 100%;
}

.text-none-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>