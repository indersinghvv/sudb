<template>
  <div class="flex w-full lg:w-1/2">
    <div class="w-1/2">
      <label for="name" class="text-sm font-semibold">BUSINESS NAME</label>
      <InputText id="name" :value="data?.name" />
    </div>
    <div class="w-1/2">
      <label for="name" class="text-sm font-semibold">COMPANY RATING</label>

      <Dropdown
        v-model="company_rating"
        :model-value="data?.company_ratings.id"
        :options="companyRatingList"
        optionLabel="name"
        optionValue="id"
        placeholder="Select a Company Rating"
        class="w-full md:w-14rem"
      />
    </div>
  </div>
</template>
<script setup>
import Dropdown from "primevue/dropdown";

const customerStore = useCustomerStore();
const companyRatingList = computed(() => customerStore.companyRatingList);
const props = defineProps({
  data: Object,
  likes: Number,
});
const company_rating = ref();
onActivated(() => {
  console.log("activated details", companyRatingList.value);
  if (companyRatingList.value?.length < 1) {
    customerStore.fetchCompanyRatings();
  }
});
</script>
