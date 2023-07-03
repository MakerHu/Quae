<template>
  <div class="local-center">
    <KeWeiSwitch v-model="isCollapse"></KeWeiSwitch>
  </div>

  <el-menu default-active="2" class="aside-menu" :collapse="isCollapse" @open="handleOpen" @close="handleClose"
    @select="handleSelect">
    <template v-for="(first, index) in state.displayRouter.children">
      <el-sub-menu :index="first.path" v-if="first.children" :key="index">
        <template #title>
          <el-icon>
            <component :is="first.meta && first.meta.icon ? first.meta.icon:'Menu'" />
          </el-icon>
          <span>{{ first.meta && first.meta.title ? first.meta.title : first.path + '（未命名）' }}</span>
        </template>
        <template v-for="(second, sec_index) in first.children">
          <el-sub-menu :index="first.path + '/' + second.path" v-if="second.children" :key="sec_index">
            <template #title>
              <span>{{ second.meta && second.meta.title ? second.meta.title : second.path + '（未命名）' }}</span>
            </template>
            <el-menu-item v-for="(third, third_index) in second.children"
              :index="first.path + '/' + second.path + '/' + third.path" :key="'item' + third_index">
              <span>{{ third.meta && third.meta.title ? third.meta.title : third.path + '（未命名）' }}</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="first.path + '/' + second.path" :key="'item' + sec_index">
            {{ second.meta && second.meta.title ? second.meta.title : second.path + '（未命名）' }}
          </el-menu-item>
        </template>
      </el-sub-menu>
      <el-menu-item class="first-menu-item" v-else :index="first.path" :key="'item' + index">
        <el-icon>
          <component :is="first.meta && first.meta.icon ? first.meta.icon:'Menu'" />
        </el-icon>
        <template #title>{{ first.meta && first.meta.title ? first.meta.title : first.path + '（未命名）' }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import manageNavRouter from '@/router/manageNavRouter'
import clientNavRouter from '@/router/clientNavRouter'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import KeWeiSwitch from '@/components/KeWeiSwitch.vue'

const router = useRouter()
const store = useStore()

const state = reactive({
  displayRouter: {

  }
})
const isCollapse = ref(false)

const user = computed(() => {
  return store.getters['authority/getUser']
})

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}

const handleSelect = (key, keyPath) => {
  router.push({ path: state.displayRouter.path + '/' + key })
}

onMounted(() => {
  state.displayRouter = user.value.role === 'ADMIN' ? manageNavRouter : clientNavRouter
})
</script>

<style>
.aside-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 100px;
}

.local-center {
  display: flex;
  justify-content: center;
}

li {
  margin: 5px
}

ul {
  margin: 5px
}

.el-menu {
  background-color: var(--kw-color-background);
}

.el-menu-item.first-menu-item {
  z-index: 999;
  margin: 5px;
  border-radius: 5px;
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-high);
}

.el-menu-item.first-menu-item:active {
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-low);
  font-size: 96%;
}

.el-menu-item.first-menu-item:hover {
  background: var(--kw-color-background);
}

.el-menu-item.first-menu-item.is-active {
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-low);
  color: black;
  font-size: 96%;
}

.el-sub-menu__title {
  z-index: 999;
  margin: 5px;
  border-radius: 5px;
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-high);
}

.el-sub-menu__title:active {
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-low);
  font-size: 96%;
}

.el-sub-menu__title:hover {
  background: var(--kw-color-background);
}

.el-menu-item:hover {
  margin: 5px;
  border-radius: 5px;
  background: var(--kw-color-background);
  box-shadow: var(--kw-box-shadow-low);
}

.el-menu-item:active {
  margin: 5px;
  border-radius: 5px;
  background: var(--kw-color-background);
  box-shadow: var(--kw-inner-shadow-shallow);
  font-size: 96%;
}

.el-menu-item.is-active {
  margin: 5px;
  border-radius: 5px;
  background: var(--kw-color-background);
  box-shadow: var(--kw-inner-shadow-shallow);
  color: black;
  font-size: 96%;
}

.el-tooltip__trigger {
  padding: 0;
  display: flex;
  justify-content: center;
}
</style>