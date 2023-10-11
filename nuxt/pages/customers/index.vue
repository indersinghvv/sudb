<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      :value="customers"
      tableStyle="min-width: 50rem"
      filterDisplay="row"
      :globalFilterFields="['name', 'status']"
      ref="dtRef"
      scrollable
      scroll-height="100vh"
      resizableColumns
      columnResizeMode="expand"
      v-memo="[customers, filters]"
    >
      <template #header>
        <div class="flex justify-content-between">
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
          <Button
            icon="pi pi-external-link"
            label="Export"
            @click="exportCSV($event)"
          />
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column field="id" header="id" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.id"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column
        field="name"
        filterField="name"
        header="Name"
        sortable
        :showFilterMenu="true"
      >
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.name"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.status"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.status"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.status"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.status"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
      <Column field="status" header="Status" sortable>
        <template #filter="{ filterModel, filterCallback }">
          <MultiSelect
            v-model="filterModel.value"
            @change="filterCallback()"
            :options="uniqueData?.status"
            placeholder="Any"
            class="p-column-filter"
            style="min-width: 14rem"
            :maxSelectedLabels="1"
          >
            <template #option="slotProps">
              <div class="flex align-items-center gap-2">
                <span>{{ slotProps.option }}</span>
              </div>
            </template>
          </MultiSelect>
        </template>
      </Column>
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
const initFilters = {
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  id: { value: null, matchMode: FilterMatchMode.IN },
  name: { value: null, matchMode: FilterMatchMode.IN },
  status: { value: null, matchMode: FilterMatchMode.IN },
};

const filters = ref(initFilters);

const uniqueData = computed(() => {
  const uniqueData = {};
  // Iterate through the data to populate the uniqueData object
  customers.value?.forEach((item) => {
    for (const key in item) {
      if (item[key] !== null) {
        if (!uniqueData[key]) {
          uniqueData[key] = new Set();
        }
        uniqueData[key].add(item[key]);
      }
    }
  });

  // Convert Set objects to arrays if needed
  for (const key in uniqueData) {
    uniqueData[key] = Array.from(uniqueData[key]);
  }
  console.log("unbdio", uniqueData);
  return uniqueData;
});
const dtRef = ref();
const exportCSV = () => {
  dtRef.value.exportCSV();
};

const customers = ref();
const fetchCustomers = async () => {
  try {
    customers.value = await getItems({
      collection: "customers",
    });
  } catch (e) {
    console.error("customers", e);
  }
};
</script>
