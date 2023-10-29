<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedCustomer"
      :value="customerList"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      selectionMode="single"
      :globalFilterFields="['name', 'status']"
      ref="dtRef"
      scrollable
      show-gridlines
      striped-rows
      dataKey="id"
      scroll-height="100vh"
      resizableColumns
      :metaKeySelection="false"
      columnResizeMode="expand"
      @rowSelect="onRowSelect"
      @rowUnselect="onRowUnselect"
      class="p-datatable-sm"
    >
      <template #header>
        <div class="flex flex-wrap justify-between gap-2">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            outlined
            v-tooltip.bottom="'Clear All Filter'"
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
              :pt="{
                root: { class: 'w-44 md:w-full' },
              }"
            />
          </span>
          <span class="p-buttonset">
            <Button
              icon="pi pi-plus"
              severity="success"
              outlined
              aria-label="Favorite"
              v-tooltip.bottom="'Add New Customer'"
            />
            <Button
              v-if="selectedCustomer"
              icon="pi pi-pencil"
              severity="info"
              outlined
              aria-label="Favorite"
              v-tooltip.bottom="'Edit Customer'"
            />
            <Button
              v-if="selectedCustomer"
              icon="pi pi-trash"
              severity="danger"
              outlined
              aria-label="Cancel"
              v-tooltip.bottom="'Delete Customer'"
            />
          </span>
          <Button
            icon="pi pi-external-link"
            @click="exportCSV($event)"
            v-tooltip.bottom="'Export in CSV'"
          />
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column selectionMode="single" headerStyle="width: 3rem"></Column>
      <template v-for="col of columns" :key="col.field">
        <Column
          :field="col.field"
          :header="col.header"
          :filter-field="col.field"
          sortable
          :show-filter-menu="false"
        >
          <template v-if="col.field == 'name'" #body="{ data }">
            <div class="flex align-center gap-2">
              <span
                class="cursor-pointer text-indigo-500 underline"
                @click="handleNameClick(data)"
                >{{ data.name }}</span
              >
            </div>
          </template>
          <template v-if="col.field == 'contact_first_name'" #body="{ data }">
            <div class="flex align-center gap-2">
              <span>{{ data.contact_first_name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-if="col.field"
              :loading="multiSelectLoading"
              v-model="filterModel.value"
              display="chip"
              filter
              @update:model-value="filterCallback"
              @show="handleShow(col.field)"
              :options="uniqueData[col.field]"
              :optionValue="col.field"
              :option-label="col.field"
              placeholder="Any"
              class="p-column-filter"
              style="min-width: 10rem"
              :maxSelectedLabels="2"
            >
              <template #option="slotProps">
                <div class="flex align-items-center gap-2">
                  <span>{{ slotProps.option[col.field] }}</span>
                </div>
              </template>
            </MultiSelect>
          </template>
        </Column>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import MultiSelect from "primevue/multiselect";
import { FilterMatchMode } from "primevue/api";

const customerStore = useCustomerStore();

const customerList = computed(() => {
  return customerStore.customerList;
});

definePageMeta({
  middleware: ["auth"],
  keepalive: true,
});

const handleNameClick = (customer) => {
  customerStore.customerDetails = customer;
  navigateTo(`customers/${customer.id}`);
};

onMounted(() => {
  customerStore.fetchCustomers();
});

const clearFilter = () => {
  filters.value = initFilters;
};

const selectedCustomer = ref();

const columns = [
  { field: "name", header: "Name" },
  { field: "contact_first_name", header: "contact_first_name" },
  { field: "contact_last_name", header: "contact_last_name" },
  { field: "phone_number", header: "phone_number" },
  { field: "mobile_number", header: "mobile_number" },
  { field: "contact_email", header: "contact_email" },
];

const initFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },

  name: { value: null, matchMode: FilterMatchMode.IN },
  contact_first_name: { value: null, matchMode: FilterMatchMode.IN },
  contact_last_name: { value: null, matchMode: FilterMatchMode.IN },
  phone_number: { value: null, matchMode: FilterMatchMode.IN },
  mobile_number: { value: null, matchMode: FilterMatchMode.IN },
  contact_email: { value: null, matchMode: FilterMatchMode.IN },
};

const filters = ref(initFilters);

const uniqueData = ref({});

const multiSelectLoading = ref(false);
const handleShow = async (e) => {
  multiSelectLoading.value = true;
  if (!uniqueData.value[e]) {
    uniqueData.value[e] = await customerStore.fetchUnique(e);
  }
  multiSelectLoading.value = false;
};

//export function
const dtRef = ref();
const exportCSV = () => {
  dtRef.value.exportCSV();
};

const onRowSelect = () => {
  console.log("selected");
};
const onRowUnselect = () => {
  console.log("un selected");
};
</script>
