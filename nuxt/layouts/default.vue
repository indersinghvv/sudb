import ColorPicker from 'primevue/colorpicker';
<script setup>
import Sidebar from "./Sidebar.vue";
import { useSidebarStore } from "~/stores/header/sidebarStore.js";
import { storeToRefs } from "pinia";
const store = useSidebarStore();
const { isOpen } = storeToRefs(store);
</script>

<template>
  <div class="relative">
    <header
      class="flex h-3rem surface-border border-bottom-1 justify-content-between align-items-center surface-100 fixed"
      style="left: 200px; width: calc(100% - 200px)"
    >
      <div class="cursor-pointer block text-700 mr-3">
        <i class="pi pi-bars text-4xl" @click="store.toggleSidebar()"> </i>
      </div>
      <div class="mr-2">logout</div>
    </header>
    <Sidebar v-show="isOpen" />

    <main class="overflow-auto m-2">
      <slot />
    </main>
  </div>
</template>
