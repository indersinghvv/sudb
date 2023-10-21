<template>
  <div class="relative h-6" style="height: 2000px">
    <nav
      class="h-3rem surface-50 top-0 sticky flex align-items-center justify-content-between z-5 border-bottom-1 surface-border"
    >
      <div
        class="flex align-items-center justify-content-center cursor-pointer p-2 border-round text-800 text-2xl hover:surface-200 transition-duration-150 transition-colors w-6rem"
      >
        <i
          class="pi pi-align-left md:hidden ml-2"
          style="font-size: 2rem"
          @click="isSidebar = !isSidebar"
        ></i>
        <span class="font-bold">SUDB</span>
      </div>
      <div class="mr-4">
        <Button
          type="button"
          size="small"
          icon="pi pi-user"
          aria-label="Submit"
          @click="toggle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        <Toast />
      </div>
    </nav>
    <aside
      v-if="isSidebar"
      class="fixed h-screen w-5rem z-5 surface-50 border-right-1 surface-border select-none overflow-auto flex flex-column align-items-center gap-2"
    >
      <NuxtLink
        to="/customers"
        class="no-underline text-gray-800 w-full"
        exactActiveClass
      >
        <div
          class="flex flex-column align-items-center cursor-pointer border-round hover:bg-primary p-1"
        >
          <i class="pi pi-user" style="font-size: 2rem"> </i>
          <span class="text-xs pt-1">Customer</span>
        </div>
      </NuxtLink>
      <NuxtLink to="/orders" class="no-underline text-gray-800">
        <div
          class="flex flex-column align-items-center cursor-pointer border-round hover:bg-primary p-1"
        >
          <i class="pi pi-user" style="font-size: 2rem"> </i>
          <span class="text-xs pt-1">Orders</span>
        </div>
      </NuxtLink>
    </aside>
    <main class="ml-0 md:ml-8 p-2"><slot /></main>
  </div>
</template>
<script setup>
import Menu from "primevue/menu";
import Toast from "primevue/toast";
const { logout } = useDirectusAuth();

const menu = ref();
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

const toggle = (event) => {
  menu.value.toggle(event);
};

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
  border-radius: var(--border-radius) !important;
}
</style>
