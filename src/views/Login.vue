<template>
    <div class="login-container">
        <div class="slogan-panel">
            <div class="slogan text-inner-shadow inner-shadow-hover pointer" @click="onLogoClick()">
                可 微 工 具 箱
            </div>
        </div>
        <div class="login-panel my-shadow">
            <div class="logo">
                <img class="pointer" src="../assets/logo.svg" alt="logo" @click="onLogoClick()" width="100" height="100">
            </div>

            <div class="input-container">
                <KeWeiInput class="login-input input-username" v-model="user.uname" icon="User" placeholder="用户名">
                </KeWeiInput>
            </div>
            <div class="input-container">
                <KeWeiInput class="login-input input-passowrd" v-model="user.password" type="password" icon="Lock"
                    placeholder="密码" @onEnterKey="login" />
            </div>
            <div class="button-panel">
                <KeWeiButton class="login-btn" @click="login">登 录</KeWeiButton>
            </div>
            <div class="button-panel">
                <KeWeiButton class="register-btn" type="flat-shallow" @click="goRegister">注 册</KeWeiButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import KeWeiInput from '@/components/KeWeiInput.vue'
import KeWeiButton from '@/components/KeWeiButton.vue'

const router = useRouter()
const store = useStore()

let user = reactive({
    uname: '',
    password: ''
})

const onLogoClick = () => {
    router.push('/tools')
}

const login = () => {
    store.dispatch('authority/asyncLogin', user).then(res=>{
        if(res.role == 'user'){
            router.push('/tools')
        }
        else router.push('/user/profile')
    }).catch(err => {
    })
}

const goRegister = () => {
    router.push('/register')
}
</script>

<style scoped>
.login-container {
    height: 100%;
    padding: 10px;
    background: var(--kw-color-background);
    overflow: auto;
}

.logo {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 20px;
}

.slogan-panel {
    margin-top: 70px;
    display: flex;
    justify-content: center;
}

.slogan {
    height: 65px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--kw-color-text-blue);
    font-size: 28px;
    font-weight: 700;
    padding: 0 30px;
    border-radius: 25px;

    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.slogan:hover {
    font-size: 27px;
}

.login-panel {
    /* background-color: aquamarine; */
    width: 300px;
    padding: 10px;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 30px;
}

.input-container {
    width: 90%;
    margin: 20px auto;
}

.login-input {
    width: 100%;
}

.button-panel {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.login-btn {
    width: 90%;
    border-radius: 20px;
    color: var(--kw-color-text-blue);
}

.register-btn {
    width: 90%;
    border-radius: 20px;
    color: var(--kw-color-text-grey);
}
</style>