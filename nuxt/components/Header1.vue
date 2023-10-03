import InputText from 'primevue/inputtext'; import InputText from
'primevue/inputtext'; import InputText from 'primevue/inputtext';
<template>
  <div class="h-screen overflow-hidden">
    <div class="min-h-screen flex relative lg:static surface-ground">
      <div
        class="surface-section h-screen lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none hidden"
        style="width: 280px"
      >
        <div class="flex flex-column h-full">
          <div
            class="flex align-items-center px-5 flex-shrink-0"
            style="height: 60px"
          >
            <h2>Head</h2>
          </div>
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
      </div>
      <div class="min-h-screen flex flex-column relative flex-auto">
        <div
          class="flex justify-content-between align-items-center px-5 surface-0 border-bottom-1 surface-border relative lg:static"
          style="height: 60px"
        >
          <div class="flex">
            <a
              class="cursor-pointer block lg:hidden text-700 mr-3 mt-1 p-ripple"
              data-pd-ripple="true"
              data-pd-styleclass="true"
            >
              <i class="pi pi-bars text-4xl"> </i>
              <span
                role="presentation"
                aria-hidden="true"
                data-p-ink="true"
                data-p-ink-active="false"
                class="p-ink"
                data-pc-name="ripple"
                data-pc-section="root"
                style="height: 41px; width: 41px; top: 1.5px; left: -5.16667px"
              >
              </span>
            </a>
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <InputText v-model="search" placeholder="Search" />
            </span>
          </div>
        </div>
        <div class="p-5 flex flex-column flex-auto">
          <div
            class="border-2 border-dashed surface-border border-round surface-section flex-auto"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import InputText from "primevue/inputtext";
import { ref } from "vue";

const search = ref("");
</script>
