<template>
    <ul>
    <li v-for="(item, index) in value" :key="index">
      <div :class="(item.children && item.children.length > 0) || level === 0 ? 'menu-sub-item' : 'menu-item'" @click="foldMenuItem(item, index)" :style="{'padding-left': indentation+'px'}">
        <div class="menu-icon" v-if="item.meta.icon">
          <q-icon :name="item.meta.icon" size="1.3em"></q-icon>
        </div>
        <div class="menu-item-title">{{ item.meta.title }}</div>
        <div v-if="(item.children && item.children.length > 0) && item.collapse" class="menu-fold-icon">
          <q-icon name="arrow-up-bold" size="0.8em"></q-icon>
        </div>
        <div v-if="(item.children && item.children.length > 0) && !item.collapse" class="menu-fold-icon">
          <q-icon name="arrow-down-bold" size="0.8em"></q-icon>
        </div>
      </div>
      <Transition>
        <QMenuItem v-if="item.children && (item.children.length > 0) && item.collapse" v-model="item.children" :current-level="level+1" :indentation="indentation+20" @menu-item-clicked="selectMenuItem"></QMenuItem>
      </Transition>
    </li>
  </ul>
  
</template>

<script setup>
import { computed } from 'vue'
import QMenuItem from './QMenuItem.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const props = defineProps(['modelValue', 'indentation' ,'currentLevel']);

const emit = defineEmits(['update:modelValue', "menu-item-clicked"]);

const value = computed({
    get() {
        return props.modelValue.filter((item) => item.meta.showMenu)
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const indentation = computed(() => {
  return props.indentation ? props.indentation:20;
});

const level = computed(() => {
  return props.currentLevel ? props.currentLevel:0;
});

const selectMenuItem = (item, index) => {
  if (!(item.children && item.children.length > 0)) {
  router.push(item.path)
    
  }
  emit("menu-item-clicked", item, index);
};

const foldMenuItem = (item, index) => {
  item.collapse = !item.collapse;
  selectMenuItem(item, index);
};


</script>

<style scoped>

ul,li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

.menu-sub-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 56px;
  cursor: pointer;
  margin: 5px;
  box-shadow: var(--quae-box-shadow-high);
  border-radius: 5px;
}

.menu-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 56px;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
}

.menu-item-title {
  flex: 1;
  align-items: center; /* 垂直居中 */
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}

.menu-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}

.menu-fold-icon {
  width: 30px;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.v-enter-to,
.v-leave-from {
  max-height: 100vh;
  overflow: hidden;
}
</style>