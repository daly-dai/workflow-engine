<template>
  <div class="basic-layout w-full h-full">
    <div
      class="flex justify-between pl-3 pr-3 pt-3 border-blue-50 border-b h-1/5"
    >
      <div class="text-2xl text-blue-400">vite-web-admin</div>
      <div></div>
    </div>

    <div class="aside w-52 h-4/5 pt-4">
      <a-menu
        :style="{ width: '200px', borderRadius: '4px' }"
        :collapsed="collapsed"
        :default-open-keys="['0']"
        :default-selected-keys="['0_2']"
      >
        <a-menu-item key="0_0">Menu 1</a-menu-item>
        <a-sub-menu key="0">
          <template #title>Navigation 1</template>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2">Menu 3</a-menu-item>
          <a-menu-item key="0_3">Menu 4</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const collapsed = ref(false);
</script>
<style lang="less"></style>
