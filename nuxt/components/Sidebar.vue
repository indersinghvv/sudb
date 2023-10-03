<template>
  <!-- Overlay for blur effect -->
  <div
    v-if="store.isOpen"
    class="fixed inset-0 surface-800 opacity-10 z-4 h-screen w-screen lg:hidden"
    @click="store.toggleSidebar()"
  ></div>
  <aside
    class="surface-section h-screen lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-5 border-right-1 surface-border select-none"
    :class="{
      'translate-x-0 ': store.isOpen,
      '-translate-x-full hidden': !store.isOpen,
    }"
    style="width: 280px"
  >
    <!-- Sidebar content goes here -->
    <div class="flex flex-column h-full">
      <div class="flex align-items-center px-5 flex-shrink-0 h-4rem">
        <img
          src="https://i.pravatar.cc/300"
          class="mr-2"
          alt=""
          style="width: 28px; height: 28px"
        />
        <h2>Head</h2>
      </div>
      <hr
        class="pb-3 mx-0 my-0 border-top-1 border-none surface-border display-inline"
      />
      <div class="overflow-y-auto">inder</div>
      <div class="mt-auto">
        <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
        <a
          class="m-3 flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
          data-pd-ripple="true"
        >
          <img
            src="https://i.pravatar.cc/300"
            class="mr-2"
            alt=""
            style="width: 28px; height: 28px"
          />
          <span class="font-medium">Amy Elsner</span>
          <span
            role="presentation"
            aria-hidden="true"
            data-p-ink="true"
            data-p-ink-active="false"
            class="p-ink"
            data-pc-name="ripple"
            data-pc-section="root"
          >
          </span>
        </a>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useSidebarStore } from "~/stores/header/sidebarStore.js";
const store = useSidebarStore();
</script>
