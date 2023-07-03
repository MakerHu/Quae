<template>
    <div class="login-container">
        <div class="slogan-panel" @click="onLogoClick()">
            <div class="slogan text-inner-shadow inner-shadow-hover pointer">
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
                <KeWeiInput class="login-input input-username" v-model="user.email" icon="Message" placeholder="邮箱">
                </KeWeiInput>
            </div>
            <div class="input-container">
                <KeWeiInput class="login-input input-passowrd" v-model="user.password" type="password" icon="Lock"
                    placeholder="密码" @onEnterKey="onRegister"></KeWeiInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep">
                    <CircleCheck />
                </el-icon>
            </div>
            <div class="input-container">
                <KeWeiInput class="login-input input-passowrd" v-model="confirmPassword" type="password" icon="Lock"
                    placeholder="确认密码" @onEnterKey="onRegister"></KeWeiInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep" v-if="false">
                    <CircleCheck />
                </el-icon>
                <el-icon class="check-tip check-tip-red inner-shadow-deep" v-else>
                    <CircleClose />
                </el-icon>
            </div>
            <div class="button-panel">
                <KeWeiButton class="login-btn" @click="onRegister">注 册</KeWeiButton>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import KeWeiInput from '@/components/KeWeiInput.vue'
import KeWeiButton from '@/components/KeWeiButton.vue'

const router = useRouter()
const store = useStore()

let confirmPassword = ref('')
let user = reactive({
    uname: '',
    email: '',
    password: '',
})

const onLogoClick = () => {
    router.push('/tools')
}

const onRegister = () => {
    store.dispatch('authority/asyncRegister', user).then(res => {
        ElMessage({
            message: '注册成功，可以登录啦！',
            offset: 30,
            type: 'success',
        })
        router.push('/login')
    }).catch(err => {
    })
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
    padding-bottom: 30px;
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

.check-tip {
    color: var(--kw-color-text-blue);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(110%, -50%);
    border-radius: 50%;
}

.check-tip-green {
    color: green;
}

.check-tip-red {
    color: red;
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
}</style>