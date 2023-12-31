<template>
    <ul>
    <li v-for="(item, index) in value" :key="index">
      <div :class="menuItemClass(item)" @click="foldMenuItem(item, index)" :style="menuItemStyle()">
        <div class="menu-icon" v-if="item.icon">
          <q-icon :name="item.icon" size="1.3em"></q-icon>
        </div>
        <div v-if="!collapse" class="menu-item-title">{{ item.title }}</div>
        <div v-if="(item.children && item.children.length > 0) && item.collapse && !collapse" class="menu-fold-icon">
          <q-icon name="arrow-up-bold" size="0.8em"></q-icon>
        </div>
        <div v-if="(item.children && item.children.length > 0) && !item.collapse && !collapse" class="menu-fold-icon">
          <q-icon name="arrow-down-bold" size="0.8em"></q-icon>
        </div>
      </div>
      <Transition>
        <QMenuItem v-if="item.children && (item.children.length > 0) && item.collapse && !collapse" v-model="item.children" :collapse="collapse" :current-level="level+1" :indentation="indentation+20" @menu-item-clicked="selectMenuItem"></QMenuItem>
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

const props = defineProps(['modelValue', 'indentation' ,'currentLevel', 'collapse']);

const emit = defineEmits(['update:modelValue', "menu-item-clicked", 'update:collapse']);

const value = computed({
    get() {
        return props.modelValue.filter((item) => item.showMenu)
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

// 是否展开
const collapse = computed({
    get() {
        return props.collapse
    },
    set(value) {
        emit('update:collapse', value)
    }
})

const indentation = computed(() => {
  return props.indentation ? props.indentation:20;
});

const level = computed(() => {
  return props.currentLevel ? props.currentLevel:0;
});

const menuItemClass = (item) => {
  return {
    'menu-sub-item': (item.children && item.children.length > 0) || level === 0,
    'menu-item': !((item.children && item.children.length > 0) || level === 0),
    'menu-item__collapse': collapse.value
  };
}

const menuItemStyle = () => {
  return collapse.value ? {}:{'padding-left': indentation.value+'px'};
}

const selectMenuItem = (item, index) => {
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

.menu-item__collapse {
    justify-content: center;
}

.menu-item-title {
  flex: 1;
  align-items: center; /* 垂直居中 */
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  padding-right: 20px;
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
  transition: max-height 0.5s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  /* opacity: 0; */
  max-height: 0;
  overflow: hidden;
}

.v-enter-to,
.v-leave-from {
  max-height: 100vh;
  overflow: hidden;
}
</style>