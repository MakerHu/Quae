<template>
  <QMenu class="quae-aside-menu">
    <template #header>
      <div class="quae-menu-header">
        <QuaeSwitch v-model="isOn"></QuaeSwitch>
      </div>
    </template>
    <template #default>
      <QMenuItem
        v-model="user.routes"
        @menu-item-clicked="menuItemClicked"
      ></QMenuItem>
    </template>
  </QMenu>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import QMenu from "@/components/menu/QMenu.vue";
import QMenuItem from "@/components/menu/QMenuItem.vue";
import QuaeSwitch from "@/components/QuaeSwitch.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

const isOn = ref(true);

const user = computed(() => {
  return store.getters["authority/getUser"];
});

const menuItemClicked = (item, index) => {
  // 处理菜单项点击事件
  console.log("Clicked menu item:", item);
  if (!(item.children && item.children.length > 0)) {
    router.push(item.path);
  }
};

onMounted(() => {});
</script>

<style scoped>
.quae-aside-menu {
  width: 200px;
}

.quae-menu-header {
  display: flex;
  justify-content: center;
  padding: 10px 0 5px 0;
}
</style>
