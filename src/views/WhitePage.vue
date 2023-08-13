<!-- <template>
    <h1>欢迎使用可微快速启动框架！这是一个空白页面，你可以在项目的/src/views/WhitePage.vue找到本页面并修改或删除。</h1>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

const store = useStore()
const route = useRoute()
const router = useRouter()

const data = reactive({})

onMounted(() => {

})
</script>

<style scoped>

</style> -->

<template>
  <button @click="addMenu">添加菜单</button>
  <div>
    <QMenu>
      <template #header>
        <div>标题</div>
      </template>
      <template #default>
        <QMenuItem
          v-model="menuItems"
          @menu-item-clicked="menuItemClicked"
        ></QMenuItem>
      </template>
    </QMenu>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import QMenu from "@/components/menu/QMenu.vue";
import QMenuItem from "@/components/menu/QMenuItem.vue";
import Login from "@/views/Login.vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const menuItems = reactive([
  {
    path: "/manage",
    name: "Home",
    meta: { title: "一级菜单1", icon: "home", showMenu: true },
    children: [
      {
        path: "/manage/sys/",
        name: "Home",
        meta: { title: "二级菜单1-1", icon: "home", showMenu: true },
        children: [],
      },
      {
        path: "/home",
        name: "Home",
        meta: { title: "二级菜单1-2", icon: "home", showMenu: true },
        children: [
          {
            path: "/manage/sys/components",
            name: "Home",
            meta: { title: "组件库", icon: "home", showMenu: true },
            children: [],
          },
        ],
      },
    ],
  },
  {
    path: "/home",
    name: "Home",
    meta: { title: "一级菜单2", icon: "modular", showMenu: true },
    children: [
      {
        path: "/home",
        name: "Home",
        meta: { title: "菜单项1", icon: "home", showMenu: true },
        children: [],
      },
    ],
  },
]);

const menuItemClicked = (item, index) => {
  // 处理菜单项点击事件
  console.log("Clicked menu item at index:", item);
};

const addMenu = () => {
  router.addRoute({ path: "/sadf", component: () => import("@/views/Register.vue") });
  // 我们也可以使用 this.$route 或 route = useRoute() （在 setup 中）
  router.replace(router.currentRoute.value.fullPath);
};
</script>

<style scoped></style>
