<template>
  <div>
    <!-- Overlay for blur effect -->
    <div
      v-if="store.isOpen"
      class="fixed inset-0 surface-800 opacity-10 z-4 h-screen w-screen lg:hidden"
      @click="store.toggleSidebar()"
    ></div>
    <aside
      :key="'sidebar'"
      class="surface-section h-screen lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-5 border-right-1 surface-border select-none"
      :class="{
        'translate-x-0 ': store.isOpen,
        '-translate-x-full hidden': !store.isOpen,
      }"
      style="width: 200px"
    >
      <!-- Sidebar content goes here -->
      <div class="flex flex-column h-full">
        <div
          class="mx-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors h-3rem"
        >
          <img
            src="https://i.pravatar.cc/300"
            class="mr-2"
            alt=""
            style="width: 28px; height: 28px"
          />
          <span class="font-bold">SUDB</span>
        </div>
        <hr
          class="pb-3 mx-0 my-0 border-top-1 border-none surface-border display-inline"
        />
        <div class="overflow-y-auto">
          <Menu
            :model="items"
            :pt="{
              root: { class: 'border-0 w-full' },
            }"
            exact
            v-once
          >
            <template #item="{ label, item, props }">
              <NuxtLink
                v-if="item.route"
                :to="item.route"
                :class="{ 'bg-primary': isItemActive(item.route) }"
                v-bind="props.action"
              >
                <span
                  v-bind="props.icon"
                  :class="{ 'text-white': isItemActive(item.route) }"
                />
                <span
                  v-bind="props.label"
                  :class="{ 'text-white': isItemActive(item.route) }"
                  >{{ label }}</span
                >
              </NuxtLink>
              <a v-else :href="item.url" v-bind="props.action">
                <span v-bind="props.icon" />
                <span v-bind="props.label">{{ label }}</span>
              </a>
            </template>
          </Menu>
        </div>
        <div class="mt-auto">
          <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
          <a
            class="m-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors"
          >
            <img
              src="https://i.pravatar.cc/300"
              class="mr-2"
              alt=""
              style="width: 28px; height: 28px"
            />
            <span class="font-medium">Amy Elsner</span>
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { useSidebarStore } from "~/stores/header/sidebarStore.js";
const route = useRoute();

import Menu from "primevue/menu";
const items = ref([
  {
    label: "Customer",
    items: [
      {
        label: "All Customer",
        icon: "pi pi-upload",
        route: "/customers",
      },
      {
        label: "Orders",
        icon: "pi pi-upload",
        route: "/orders",
      },
    ],
  },
]);

onMounted(() => {
  console.log("mounting sidebar");
});
const isItemActive = (itemRoute) => {
  return route.fullPath === itemRoute;
};
const store = useSidebarStore();
</script>
