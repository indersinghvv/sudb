<template>
  <div class="card">
    <DataTable
      v-if="customerList.length"
      v-model:filters="filters"
      v-model:selection="selectedCustomer"
      :value="customerList"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      selectionMode="single"
      :globalFilterFields="['name']"
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
          <div style="text-align: left">
            <MultiSelect
              :modelValue="selectedColumns"
              :options="columns"
              option-label="header"
              display="chip"
              placeholder="Select Columns"
              :maxSelectedLabels="1"
              @update:modelValue="onToggle"
            />
          </div>
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
              @click="handleAddNewCustomer"
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
              @click="confirm2($event)"
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
      <template v-for="col of selectedColumns" :key="col.field">
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
          <template v-if="col.field == 'contacts'" #body="{ data }">
            <div class="flex align-center gap-2">
              <span>{{ data.contacts[0]?.first_name }}</span>
            </div>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <MultiSelect
              v-if="col.field"
              v-model="filterModel.value"
              display="chip"
              filter
              @update:model-value="filterCallback"
              @show="filterUniqueValues(col.field)"
              :options="uniqueData[col.field]"
              optionValue="name"
              option-label="name"
              placeholder="Any"
              class="p-column-filter"
              style="min-width: 10rem"
              :maxSelectedLabels="1"
            >
              <template #option="slotProps">
                <div class="flex align-items-center gap-2">
                  <span>{{ slotProps.option.name }}</span>
                </div>
              </template>
            </MultiSelect>
          </template>
        </Column>
      </template>
    </DataTable>
    <CustomerAddNewCustomerDialog />
    <Toast />
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import Toast from "primevue/toast";
import ConfirmPopup from "primevue/confirmpopup";
import MultiSelect from "primevue/multiselect";
import { FilterMatchMode } from "primevue/api";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const customerStore = useCustomerStore();

const handleAddNewCustomer = () => {
  console.log("handleAddNewCustomer");
  customerStore.addNewCustomerDialog = true;
};

definePageMeta({
  middleware: ["auth"],
  keepalive: true,
});

const handleNameClick = (customer) => {
  customerStore.customerDetails = customer;
  navigateTo(`customers/${customer.id}`);
};

const customerList = ref([]);
const columns = ref([]);
const selectedColumns = ref([]);
let initFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
};
const clearFilter = () => {
  filters.value = initFilters;
};

const filters = ref([]);
onMounted(async () => {
  customerList.value = await customerStore.fetchCustomers();
  columns.value = findcolumns(customerList.value);
  selectedColumns.value = columns.value;
  columns.value?.forEach((element) => {
    initFilters[element.field] = { value: null, matchMode: FilterMatchMode.IN };
  });
  filters.value = initFilters;
  console.log("initFilters", filters.value);
});

const onToggle = (val) => {
  console.log("onToggle", val);
  selectedColumns.value = columns.value.filter((col) => val.includes(col));
  return selectedColumns.value;
};
const findcolumns = (response) => {
  // Assuming customerList is reactive and an array of objects
  const firstCustomer = response && response.length > 0 ? response[0] : {};

  // Get the keys of the first object
  const keysOfFirstCustomer = Object.keys(firstCustomer).map((key) => ({
    field: key,
    header: key.replace(/_/g, " ").replace(/(?:^|\s)\S/g, function (a) {
      return a.toUpperCase();
    }),
  }));
  console.log("columns", keysOfFirstCustomer);

  return keysOfFirstCustomer;
};

//export function
const dtRef = ref();
const exportCSV = () => {
  dtRef.value.exportCSV();
};
const selectedCustomer = ref();
const onRowSelect = () => {
  console.log("selected", selectedColumns.value);
};

const onRowUnselect = () => {
  console.log("un selected");
};

const uniqueData = ref({});

const filterUniqueValues = (col) => {
  if (col && customerList.value && !uniqueData.value[col]) {
    const result = _findUniqueValuesByKey(customerList.value, col);
    console.log("filterUniqueValues", uniqueData.value);
    uniqueData.value[col] = result;
  }
};

function _findUniqueValuesByKey(data, key) {
  const uniqueValues = new Set();

  for (const item of data) {
    uniqueValues.add(item[key]);
  }
  return Array.from(uniqueValues).map((value) => ({ name: value }));
}
// confirm dialog
const confirm = useConfirm();
const toast = useToast();
const confirm2 = (event) => {
  confirm.require({
    target: event.currentTarget,
    message: "Do you want to delete this record?",
    icon: "pi pi-info-circle",
    acceptClass: "p-button-danger p-button-sm",
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "error",
        summary: "Rejected",
        detail: "You have rejected",
        life: 3000,
      });
    },
  });
};
</script>
