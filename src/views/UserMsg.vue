<template>
    <el-page-header class="goback" @back="goBack" icon="ArrowLeftBold">
        <template #title>
            <span>返回</span>
        </template>
        <template #content>
            <span>个人中心</span>
        </template>
    </el-page-header>
    <div>
        <div class="msg-panel my-shadow">
            <div class="logo">
                用户信息
            </div>

            <div class="input-container" :onmouseover="onUnameMouseOver" :onmouseout="onUnameMouseOut" >
                <KeWeiInput class="msg-input input-username" v-model="state.newUser.uname" icon="User" placeholder="用户名"
                    :disabled="!unameEditable">
                </KeWeiInput>
                <div id="uname-btn-container" class="edit-btn-container">
                    <KeWeiButton class="edit-btn" @click="unameEditable = true" v-show="!unameEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn green-btn" @click="editUname" v-show="unameEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn" @click="cancelUname" v-show="unameEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </KeWeiButton>
                </div>
            </div>
            <div class="input-container" :onmouseover="onEmailMouseOver" :onmouseout="onEmailMouseOut" >
                <KeWeiInput class="msg-input input-username" v-model="state.newUser.email" icon="Message" placeholder="邮箱"
                    :disabled="!emailEditable">
                </KeWeiInput>
                <div id="email-btn-container" class="edit-btn-container">
                    <KeWeiButton class="edit-btn" @click="emailEditable = true" v-show="!emailEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn green-btn" @click="editEmail" v-show="emailEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn" @click="cancelEmail" v-show="emailEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </KeWeiButton>
                </div>
            </div>
            <div class="input-container" :onmouseover="onPasswordMouseOver" :onmouseout="onPasswordMouseOut">
                <KeWeiInput class="msg-input input-passowrd" v-model="state.newUser.password" type="password"
                    icon="Lock" placeholder="密码" :disabled="!passwordEditable"></KeWeiInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep" v-show="false">
                    <CircleCheck />
                </el-icon>
                <el-icon class="check-tip check-tip-red inner-shadow-deep" v-show="false">
                    <CircleClose />
                </el-icon>
                <div id="password-btn-container" class="edit-btn-container">
                    <KeWeiButton class="edit-btn" @click="passwordEditable = true" v-show="!passwordEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn green-btn" @click="editPassword" v-show="passwordEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </KeWeiButton>
                    <KeWeiButton class="edit-btn" @click="cancelPassword" v-show="passwordEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </KeWeiButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import { updatePassword, updateEmail, updateUname, getUserById, updatePasswordAdmin } from '@/apis/UserApi'

import KeWeiInput from '@/components/KeWeiInput.vue'
import KeWeiButton from '@/components/KeWeiButton.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const props = defineProps({
    uid: {
        type: String
    }
})

const unameEditable = ref(false)
const emailEditable = ref(false)
const passwordEditable = ref(false)
const state = reactive({
    user: {},
    newUser: {
        uname: '',
        email: '',
        password: '',
        role: ''
    }
})

const goBack = () => {
    router.back()
}

const onUnameMouseOver = () => {
    if (!unameEditable.value) {
        document.getElementById('uname-btn-container').style.display = 'flex'
    }
}

const onUnameMouseOut = () => {
    if (!unameEditable.value) {
        document.getElementById('uname-btn-container').style.display = 'none'
    }
}

const editUname = () => {
    updateUname(state.user.id, state.newUser.uname).then((res) => {
        tipMsg('success', '操作成功！')
        unameEditable.value = !unameEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelUname = () => {
    unameEditable.value = false
    state.newUser.uname = state.user.uname
}

const onEmailMouseOver = () => {
    if (!emailEditable.value) {
        document.getElementById('email-btn-container').style.display = 'flex'
    }
}

const onEmailMouseOut = () => {
    if (!emailEditable.value) {
        document.getElementById('email-btn-container').style.display = 'none'
    }
}

const editEmail = () => {
    updateEmail(state.user.id, state.newUser.email).then((res) => {
        tipMsg('success', '操作成功！')
        emailEditable.value = !emailEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelEmail = () => {
    emailEditable.value = false
    state.newUser.email = state.user.email
}

const onPasswordMouseOver = () => {
    if (!passwordEditable.value) {
        document.getElementById('password-btn-container').style.display = 'flex'
    }
}

const onPasswordMouseOut = () => {
    if (!passwordEditable.value) {
        document.getElementById('password-btn-container').style.display = 'none'
    }
}

const editPassword = () => {
    updatePasswordAdmin(state.user.id, state.newUser.password).then((res) => {
        tipMsg('success', '操作成功！')
        passwordEditable.value = !passwordEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelPassword = () => {
    passwordEditable.value = false
    state.newUser.password = ''
}

const tipMsg = (type, msg) => {
    ElMessage({
        message: msg,
        offset: 30,
        type: type,
    })
}

onMounted(() => {
    getUserById(props.uid).then((res) => {
        state.user = res
        state.newUser = JSON.parse(JSON.stringify(state.user))
    }).catch((err) => {

    })
})
</script>

<style scoped>
.goback {
    margin-bottom: 10px;
}
.logo {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 10px;
    font-size: large;
}

.msg-panel {
    /* background-color: aquamarine; */
    width: 300px;
    padding: 10px;
    padding-bottom: 10px;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 30px;
}

.input-container {
    width: 90%;
    margin: 20px auto;
}

.msg-input {
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
    top: 20px;
    transform: translate(110%, -50%);
    border-radius: 50%;
}

.check-tip-green {
    color: green;
}

.check-tip-red {
    color: red;
}

.msg-btn {
    width: 90px;
}

.edit-btn-container {
    display: none;
    justify-content: right;
    margin-top: 3px;
}

.edit-btn {
    border-radius: 50%;
    width: 25px;
    height: 25px;
}

.green-btn {
    color: green;
}</style>