import ColorPicker from 'primevue/colorpicker';
<script setup>
import InputText from "primevue/inputtext";
import Sidebar from "./Sidebar.vue";
import { useSidebarStore } from "~/stores/header/sidebarStore.js";
const store = useSidebarStore();
</script>

<template>
  <div class="h-screen overflow-hidden">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <Sidebar />
      <div class="min-h-screen flex flex-column relative flex-auto">
        <div
          class="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static h-4rem"
        >
          <div class="flex">
            <div class="cursor-pointer block lg:hidden text-700 mr-3 mt-1">
              <i class="pi pi-bars text-4xl" @click="store.toggleSidebar()">
              </i>
            </div>
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText placeholder="Search" />
            </span>
          </div>
        </div>
        <div class="p-2 flex flex-column flex-auto z-0">
          <div
            class="border-2 border-dashed surface-border border-round surface-section flex-auto"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
