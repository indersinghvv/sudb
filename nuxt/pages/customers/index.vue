<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedCustomer"
      :value="customers"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      selectionMode="single"
      :globalFilterFields="['name', 'status']"
      ref="dtRef"
      scrollable
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
        <div class="flex justify-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            outlined
            @click="clearFilter()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filters['global'].value"
              placeholder="Keyword Search"
            />
          </span>
          <span class="p-buttonset">
            <Button
              icon="pi pi-plus"
              severity="success"
              label="Add"
              rounded
              outlined
              aria-label="Favorite"
            />
            <Button
              v-if="selectedCustomer"
              icon="pi pi-pencil"
              severity="info"
              label="Edit"
              rounded
              outlined
              aria-label="Favorite"
            />
            <Button
              v-if="selectedCustomer"
              icon="pi pi-trash"
              severity="danger"
              rounded
              outlined
              aria-label="Cancel"
              label="Delete"
            />
          </span>
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column selectionMode="single" headerStyle="width: 3rem"></Column>
      <Column
        v-for="col of columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
        :filter-field="col.field"
        sortable
      >
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
            style="min-width: 14rem"
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
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import InputText from "primevue/inputtext";
import Column from "primevue/column";
import MultiSelect from "primevue/multiselect";
import { FilterMatchMode } from "primevue/api";
const { getItems } = useDirectusItems();

definePageMeta({
  middleware: ["auth"],
});

onMounted(() => {
  fetchCustomers();
});

const clearFilter = () => {
  filters.value = initFilters;
};

const selectedCustomer = ref();

const columns = [
  { field: "id", header: "id" },
  { field: "name", header: "Name" },
  { field: "contact_email", header: "contact_email" },
  { field: "contact_first_name", header: "contact_first_name" },
  { field: "contact_last_name", header: "contact_last_name" },
];

const initFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.IN },
  name: { value: null, matchMode: FilterMatchMode.IN },
  contact_email: { value: null, matchMode: FilterMatchMode.IN },
  contact_first_name: { value: null, matchMode: FilterMatchMode.IN },
  contact_last_name: { value: null, matchMode: FilterMatchMode.IN },
};

const filters = ref(initFilters);

const uniqueData = ref({});
const multiSelectLoading = ref(false);
const handleShow = async (e) => {
  multiSelectLoading.value = true;
  if (!uniqueData.value[e]) {
    uniqueData.value[e] = await fetchUnique(e);
  }
  multiSelectLoading.value = false;
};

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

const customers = ref();
const fetchCustomers = async () => {
  try {
    customers.value = await getItems({
      collection: "customers",
      params: {
        fields: "*.*",
      },
    });
    console.log("customer data", customers.value);
  } catch (e) {
    console.error("customers", e);
  }
};
const fetchUnique = async (col) => {
  try {
    const res = await getItems({
      collection: "customers",
      params: {
        groupBy: col,
      },
    });
    return res;
  } catch (e) {
    console.error("customers", e);
  }
};
</script>
