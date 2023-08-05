<template>
    <div>
        <div class="msg-panel shadow-high">
            <div class="logo">
                {{ passwordEditable ? '修改密码' : '个人信息' }}
            </div>

            <div class="input-container" :onmouseover="onUnameMouseOver" :onmouseout="onUnameMouseOut"
                v-show="!passwordEditable">
                <QuaeInput class="msg-input input-username" v-model="state.newUser.uname" icon="User" placeholder="用户名"
                    :disabled="!unameEditable">
                </QuaeInput>
                <div id="uname-btn-container" class="edit-btn-container">
                    <QuaeButton class="edit-btn" @click="unameEditable = true" v-show="!unameEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </QuaeButton>
                    <QuaeButton class="edit-btn green-btn" @click="editUname" v-show="unameEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </QuaeButton>
                    <QuaeButton class="edit-btn" @click="cancelUname" v-show="unameEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </QuaeButton>
                </div>
            </div>
            <div class="input-container" :onmouseover="onEmailMouseOver" :onmouseout="onEmailMouseOut"
                v-show="!passwordEditable">
                <QuaeInput class="msg-input input-username" v-model="state.newUser.email" icon="Message" placeholder="邮箱"
                    :disabled="!emailEditable">
                </QuaeInput>
                <div id="email-btn-container" class="edit-btn-container">
                    <QuaeButton class="edit-btn" @click="emailEditable = true" v-show="!emailEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </QuaeButton>
                    <QuaeButton class="edit-btn green-btn" @click="editEmail" v-show="emailEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </QuaeButton>
                    <QuaeButton class="edit-btn" @click="cancelEmail" v-show="emailEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </QuaeButton>
                </div>
            </div>
            <div class="input-container" :onmouseover="onPasswordMouseOver" :onmouseout="onPasswordMouseOut">
                <QuaeInput class="msg-input input-passowrd" v-model="state.newUser.password" type="password" icon="Lock"
                    placeholder="密码" :disabled="!passwordEditable"></QuaeInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep" v-show="false">
                    <CircleCheck />
                </el-icon>
                <div id="password-btn-container" class="edit-btn-container">
                    <QuaeButton class="edit-btn" @click="onStartEditPwd" v-show="!passwordEditable">
                        <el-icon>
                            <Edit />
                        </el-icon>
                    </QuaeButton>
                </div>
            </div>
            <div class="input-container" v-show="passwordEditable">
                <QuaeInput class="msg-input input-passowrd" v-model="state.newUser.newPassword" type="password"
                    icon="Lock" placeholder="新密码"></QuaeInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep" v-show="false">
                    <CircleCheck />
                </el-icon>
                <el-icon class="check-tip check-tip-red inner-shadow-deep" v-show="false">
                    <CircleClose />
                </el-icon>
            </div>
            <div class="input-container" v-show="passwordEditable">
                <QuaeInput class="msg-input input-passowrd" v-model="state.newUser.confirmPassword" type="password"
                    icon="Lock" placeholder="确认密码"></QuaeInput>
                <el-icon class="check-tip check-tip-green inner-shadow-deep" v-show="false">
                    <CircleCheck />
                </el-icon>
                <el-icon class="check-tip check-tip-red inner-shadow-deep" v-show="false">
                    <CircleClose />
                </el-icon>
                <div id="password-btn2-container" class="edit-btn-container">
                    <QuaeButton class="edit-btn green-btn" @click="editPassword" v-show="passwordEditable">
                        <el-icon>
                            <Check />
                        </el-icon>
                    </QuaeButton>
                    <QuaeButton class="edit-btn" @click="cancelPassword" v-show="passwordEditable">
                        <el-icon>
                            <Close />
                        </el-icon>
                    </QuaeButton>
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

import { updatePassword, updateEmail, updateUname } from '@/apis/UserApi'

import QuaeInput from '@/components/QuaeInput.vue'
import QuaeButton from '@/components/QuaeButton.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const unameEditable = ref(false)
const emailEditable = ref(false)
const passwordEditable = ref(false)
const state = reactive({
    newUser: {
        uname: '',
        email: '',
        password: '',
        newPassword: '',
        confirmPassword: '',
        role: ''
    }
})

const user = computed(() => {
    return store.getters['authority/getUser']
})

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
    updateUname(user.value.id, state.newUser.uname).then((res) => {
        store.dispatch('authority/asyncUpdateUser', res)
        tipMsg('success', '操作成功！')
        unameEditable.value = !unameEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelUname = () => {
    unameEditable.value = false
    state.newUser.uname = user.value.uname
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
    updateEmail(user.value.id, state.newUser.email).then((res) => {
        store.dispatch('authority/asyncUpdateUser', res)
        tipMsg('success', '操作成功！')
        emailEditable.value = !emailEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelEmail = () => {
    emailEditable.value = false
    state.newUser.email = user.value.email
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

const onStartEditPwd = () => {
    passwordEditable.value = true
    document.getElementById('password-btn2-container').style.display = 'flex'
}

const editPassword = () => {
    updatePassword(user.value.id, state.newUser.password, state.newUser.confirmPassword).then((res) => {
        store.dispatch('authority/asyncUpdateUser', res)
        tipMsg('success', '操作成功！')
        passwordEditable.value = !passwordEditable.value
    }).catch((err) => {
        tipMsg('warning', '操作异常！')
    })
}

const cancelPassword = () => {
    passwordEditable.value = false
    state.newUser.password = ''
    state.newUser.newPassword = ''
    state.newUser.confirmPassword = ''
}

const tipMsg = (type, msg) => {
    ElMessage({
        message: msg,
        offset: 30,
        type: type,
    })
}

onMounted(() => {
    state.newUser = JSON.parse(JSON.stringify(user.value))
})
</script>

<style scoped>
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
    color: var(--quae-color-text-blue);
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