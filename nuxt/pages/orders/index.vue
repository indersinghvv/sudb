<template>
  <div class="card flex justify-content-center">
    <Button
      type="button"
      label="Toggle"
      @click="toggle"
      aria-haspopup="true"
      aria-controls="overlay_menu"
    />
    <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
    <Toast />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import Toast from "primevue/toast";
import Menu from "primevue/menu";

const menu = ref();
const items = ref([
  {
    label: "Options",
    items: [
      {
        label: "Update",
        icon: "pi pi-refresh",
      },
      {
        label: "Delete",
        icon: "pi pi-times",
      },
    ],
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
