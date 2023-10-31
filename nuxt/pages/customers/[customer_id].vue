<template>
  <div class="card">
    <div class="flex flex-wrap justify-between bg-gray-50 p-1">
      <div class="flex items-center">
        <Button
          icon="pi pi-arrow-left"
          text
          rounded
          aria-label="Cancel"
          @click="navigateTo('/customers')"
        />
        <span class="text-lg lg:text-2xl font-bold ml-2">{{
          customerDetails?.name
        }}</span>
      </div>
      <Button label="Add Order" />
    </div>
    <TabView>
      <TabPanel header="Customer Details">
        <CustomerDetails v-if="customerDetails" :data="customerDetails" />
      </TabPanel>
      <TabPanel header="Previous Orders">
        <CustomerPreviousOrders />
      </TabPanel>
      <TabPanel header="Customer Products">
        <CustomerProducts />
      </TabPanel>
      <TabPanel header="Logos">
        <CustomerLogos />
      </TabPanel>
      <TabPanel header="Attachments">
        <CustomerAttachments />
      </TabPanel>
    </TabView>
  </div>
</template>
<script setup>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
definePageMeta({
  middleware: ["auth"],
  keepalive: true,
});
const route = useRoute();
const customer_id = route.params.customer_id;
const customerStore = useCustomerStore();

const customerDetails = computed(() => customerStore.customerDetails);

onActivated(async () => {
  if (!customerDetails.value) {
    await customerStore.fetchCustomerById(customer_id);
  }
});
</script>
