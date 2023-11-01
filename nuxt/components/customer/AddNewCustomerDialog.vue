<template>
  <Dialog
    v-model:visible="addNewCustomerDialog"
    maximizable
    modal
    header="Add New Customer"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <p class="m-0">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </Dialog>
</template>
<script setup>
import Dialog from "primevue/dialog";
const customerStore = useCustomerStore();
const addNewCustomerDialog = computed({
  // getter
  get() {
    return customerStore.addNewCustomerDialog;
  },
  // setter
  set(newValue) {
    // Note: we are using destructuring assignment syntax here.
    customerStore.addNewCustomerDialog = newValue;
  },
});
</script>
