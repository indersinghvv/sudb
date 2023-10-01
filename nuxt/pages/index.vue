<template>
  <div class="flex justify-content-center">
    <Dropdown
      v-model="selectedCity"
      :options="cities"
      optionLabel="name"
      placeholder="Select a City"
      class="w-full md:w-14rem"
    />
  </div>
  <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
      <img
        src="images/blocks/logos/hyper.svg"
        alt="Image"
        height="50"
        class="mb-3"
      />
      <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
      <span class="text-600 font-medium line-height-3"
        >Don't have an account?</span
      >
      <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
        >Create today!</a
      >
    </div>

    <div>
      <label for="email1" class="block text-900 font-medium mb-2">Email</label>
      <InputText id="email1" type="text" class="w-full mb-3" />

      <label for="password1" class="block text-900 font-medium mb-2"
        >Password</label
      >
      <InputText id="password1" type="password" class="w-full mb-3" />

      <div class="flex align-items-center justify-content-between mb-6">
        <div class="flex align-items-center">
          <Checkbox
            id="rememberme1"
            :binary="true"
            v-model="checked"
            class="mr-2"
          ></Checkbox>
          <label for="rememberme1">Remember me</label>
        </div>
        <a
          class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
          >Forgot password?</a
        >
      </div>

      <Button label="Sign In" class="w-full"
        ><template #buttonicon>
          <span class="material-icons">arrow_drop_down</span>
        </template></Button
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

const selectedCity = ref();
const checked = ref(false);
const cities = ref([
  { name: "New York", code: "NY" },
  { name: "Rome", code: "RM" },
  { name: "London", code: "LDN" },
  { name: "Istanbul", code: "IST" },
  { name: "Paris", code: "PRS" },
]);
</script>
