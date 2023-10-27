<template>
  <div class="relative h-96">
    <nav
      class="h-12 bg-gray-50 top-0 sticky flex items-center justify-between z-50 border-b surface-border"
    >
      <div
        class="flex items-center justify-center p-2 rounded-full text-gray-800 text-2xl hover:bg-gray-200 transition duration-150"
      >
        <span class="">
          <i
            class="pi pi-align-left ml-2 cursor-pointer text-2xl"
            @click.stop="isSidebar = !isSidebar"
          ></i>
        </span>
        <NuxtLink to="/" class="!bg-gray-50 !text-gray-700">
          <span
            class="font-bold ml-2 cursor-pointer transition-colors w-24"
            @click="$route.path('/')"
          >
            SUDB
          </span>
        </NuxtLink>
      </div>
      <div class="mr-4">
        <SplitButton
          label="inder"
          icon="pi pi-user"
          :model="items"
          outlined
          size="small"
        >
          <template #menubuttonicon>
            <MdiChevronDown :size="24" />
          </template>
        </SplitButton>
      </div>
    </nav>
    <aside
      v-if="isSidebar"
      class="fixed h-screen w-20 z-50 bg-gray-50 border-r surface-border select-none overflow-auto flex flex-col"
    >
      <NuxtLink
        href="/customers"
        class="no-underline text-gray-800 w-full"
        exact-active-class
      >
        <div
          class="flex flex-col items-center cursor-pointer hover:bg-primary p-1"
        >
          <i class="pi pi-user text-2xl"></i>
          <span class="text-xs pt-1">Customer</span>
        </div>
      </NuxtLink>
      <NuxtLink href="/orders" class="no-underline text-gray-800">
        <div
          class="flex flex-col items-center cursor-pointer hover:bg-primary p-1"
        >
          <i class="pi pi-user text-2xl"></i>
          <span class="text-xs pt-1">Orders</span>
        </div>
      </NuxtLink>
    </aside>
    <main
      class="ml-0 p-2 z-10"
      :class="[!isSidebar ? 'ml-0 !important' : 'md:ml-20']"
    >
      <slot />
    </main>
  </div>
</template>
<script setup>
import SplitButton from "primevue/splitbutton";
import MdiChevronDown from "vue-material-design-icons/ChevronDown.vue";
const { logout } = useDirectusAuth();

const items = ref([
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: async () => {
      await logout();
      navigateTo("/login");
    },
  },
]);

const isSidebar = ref(false);
const updateInnerWidth = () => {
  if (window.innerWidth > 767) {
    console.log("listening");
    isSidebar.value = true;
  } else {
    isSidebar.value = false;
  }
};
onMounted(() => {
  updateInnerWidth();
  window.addEventListener("resize", updateInnerWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateInnerWidth);
});
</script>
<style>
.router-link-exact-active {
  background-color: var(--primary-color) !important;
  color: var(--primary-color-text) !important;
}
</style>
