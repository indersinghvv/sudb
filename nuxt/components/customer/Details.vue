<template>
  <div class="flex flex-wrap gap-4 w-full">
    <div class="w-full lg:w-[23%]">
      <label for="name" class="text-sm font-bold">BUSINESS NAME</label>
      <InputText
        v-model="customerDetailForm.name"
        id="name"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="name" class="text-sm font-bold">COMPANY RATING</label>

      <Dropdown
        v-model="customerDetailForm.company_ratings"
        :options="companyRatingList"
        optionLabel="name"
        optionValue="id"
        placeholder="Select a Company Rating"
        class="w-full md:w-14rem"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="first_name" class="text-sm font-bold"
        >CONTACT FIRST NAME</label
      >
      <InputText
        id="first_name"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="last_name" class="text-sm font-bold">CONTACT LAST NAME</label>
      <InputText
        id="last_name"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="phone_number" class="text-sm font-bold">PHONE NUMBER</label>
      <InputText
        v-model="customerDetailForm.phone_number"
        id="phone_number"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="fax_number" class="text-sm font-bold">FAX NUMBER</label>
      <InputText
        v-model="customerDetailForm.fax_number"
        id="fax_number"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="mobile_number" class="text-sm font-bold">MOBILE NUMBER</label>
      <InputText
        v-model="customerDetailForm.mobile_number"
        id="mobile_number"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="business_email" class="text-sm font-bold">
        BUSINESS EMAIL
      </label>
      <InputText
        v-model="customerDetailForm.business_email"
        id="business_email"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-full">
      <label for="postal_address" class="text-sm font-bold">
        Postal Address
      </label>
      <InputText
        v-model="customerDetailForm.postal_address"
        id="postal_address"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="city" class="text-sm font-bold">CITY</label>
      <InputText
        v-model="customerDetailForm.city"
        id="city"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="state" class="text-sm font-bold">STATE</label>
      <InputText
        v-model="customerDetailForm.state"
        id="state"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="zip_code" class="text-sm font-bold">ZIP CODE</label>
      <InputText
        v-model="customerDetailForm.zip_code"
        id="zip_code"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-full">
      <label for="is_shipping_address" class="text-sm font-bold pr-2"
        >Postal & Shipping Address are Different</label
      >
      <Checkbox
        id="is_shipping_address"
        v-model="customerDetailForm.is_shipping_address"
        binary
        aria-describedby="is_shipping_address-error"
      />
    </div>
    <div v-if="customerDetailForm.is_shipping_address" class="w-full lg:w-full">
      <label for="shipping_address" class="text-sm font-bold">
        Shipping Address
      </label>
      <InputText
        v-model="customerDetailForm.shipping_address"
        id="shipping_address"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div
      v-if="customerDetailForm.is_shipping_address"
      class="w-full lg:w-[23%]"
    >
      <label for="shipping_city" class="text-sm font-bold">CITY</label>
      <InputText
        v-model="customerDetailForm.shipping_city"
        id="shipping_city"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div
      v-if="customerDetailForm.is_shipping_address"
      class="w-full lg:w-[23%]"
    >
      <label for="shipping_state" class="text-sm font-bold">STATE</label>
      <InputText
        v-model="customerDetailForm.shipping_state"
        id="shipping_state"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div
      v-if="customerDetailForm.is_shipping_address"
      class="w-full lg:w-[23%]"
    >
      <label for="shipping_zip_code" class="text-sm font-bold">ZIP CODE</label>
      <InputText
        v-model="customerDetailForm.shipping_zip_code"
        id="shipping_zip_code"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="days" class="text-sm font-bold">DAYS</label>
      <InputText
        v-model="customerDetailForm.days"
        id="days"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="payment_terms" class="text-sm font-bold">PAYMENT TERMS</label>
      <InputText
        v-model="customerDetailForm.payment_terms"
        id="payment_terms"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="invoice_theme" class="text-sm font-bold">INVOICE THEME</label>
      <InputText
        v-model="customerDetailForm.invoice_theme"
        id="invoice_theme"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-[23%]">
      <label for="last_order" class="text-sm font-bold">
        LAST ORDER DATE
      </label>
      <InputText
        v-model="customerDetailForm.last_order"
        id="last_order"
        :pt="{ root: { class: 'w-full' } }"
        autocomplete="off"
      />
    </div>
    <div class="w-full lg:w-full text-end">
      <Button label="Submit" />
    </div>
  </div>
</template>
<script setup>
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";

const customerStore = useCustomerStore();
const companyRatingList = computed(() => customerStore.companyRatingList);
const props = defineProps({
  data: Object,
  mode: String,
  likes: Number,
});
const customerDetailForm = ref({
  business_email: props.data?.business_email,
  city: props.data?.city,
  company_ratings: props.data?.company_ratings.id,
  days: props.data?.days,
  fax_number: props.data?.fax_number,
  invoice_theme: props.data?.invoice_theme,
  is_shipping_address: props.data?.is_shipping_address,
  last_order: props.data?.last_order,
  mobile_number: props.data?.mobile_number,
  name: props.data?.name,
  notes_details: props.data?.notes_details,
  payment_terms: props.data?.payment_terms,
  phone_number: props.data?.phone_number,
  postal_address: props.data?.postal_address,
  shipping_address: props.data?.shipping_address,
  shipping_city: props.data?.shipping_city,
  shipping_state: props.data?.shipping_state,
  shipping_zip_code: props.data?.shipping_zip_code,
  state: props.data?.state,
  zip_code: props.data?.zip_code,
});

onMounted(async () => {
  console.log("activated details", companyRatingList.value?.length);
  if (!companyRatingList.value?.length) {
    await customerStore.fetchCompanyRatings();
  }
});
</script>
