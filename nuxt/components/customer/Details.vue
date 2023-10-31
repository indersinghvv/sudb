<template>
  <div class="flex flex-wrap gap-2 w-full">
    <div class="w-full lg:w-[24%]">
      <label for="name" class="text-sm font-semibold">BUSINESS NAME</label>
      <InputText
        id="name"
        :value="data?.name"
        :pt="{ root: { class: 'w-full' } }"
      />
    </div>
    <div class="w-full lg:w-[24%]">
      <label for="name" class="text-sm font-semibold">COMPANY RATING</label>

      <Dropdown
        v-model="company_rating"
        :options="companyRatingList"
        optionLabel="name"
        optionValue="id"
        placeholder="Select a Company Rating"
        class="w-full md:w-14rem"
      />
    </div>
    <div class="w-full lg:w-[24%]">
      <label for="name" class="text-sm font-semibold">CONTACT FIRST NAME</label>
      <InputText
        id="name"
        :value="data?.name"
        :pt="{ root: { class: 'w-full' } }"
      />
    </div>
    <div class="w-full lg:w-[24%]">
      <label for="name" class="text-sm font-semibold">CONTACT LAST NAME</label>
      <InputText
        id="name"
        :value="data?.name"
        :pt="{ root: { class: 'w-full' } }"
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

const company_rating = ref(props.data?.company_ratings.id);
onMounted(async () => {
  console.log("activated details", companyRatingList.value?.length);
  if (companyRatingList.value?.length < 1) {
    await customerStore.fetchCompanyRatings();
  }
});
</script>
