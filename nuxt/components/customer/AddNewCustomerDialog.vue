<template>
  <Dialog
    v-model:visible="addNewCustomerDialog"
    maximizable
    modal
    header="Add New Customer"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <CustomerDetails mode="new" />
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
