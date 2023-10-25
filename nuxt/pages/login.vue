<template>
  <div class="flex items-center justify-center h-screen">
    <div class="bg-white p-4 shadow-md rounded-lg w-full lg:w-6/12">
      <div class="text-center mb-5">
        <div
          class="text-gray-900 text-3xl font-medium mb-3 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-yellow-700"
        >
          Welcome Back
        </div>

        <span class="text-gray-600 font-medium leading-3"
          >Don't have an account?</span
        >
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >Create today!</a
        >
      </div>
      <div>
        <label for="email1" class="block text-gray-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email1"
          type="text"
          class="w-full mb-3"
          v-model="email"
        />

        <label for="password1" class="block text-gray-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          id="password1"
          type="password"
          class="w-full mb-3"
          v-model="password"
        />

        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center">
            <Checkbox v-model="checked" inputId="ingredient2" value="true" />
            <label for="ingredient2" class="ml-2"> remember me </label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>
        <div class="">
          <Button class="w-full" @click="onSubmit" label="Sign In" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";

definePageMeta({
  middleware: ["guest"],
  layout: "empty",
});

const email = ref("");
const password = ref("");
const checked = ref(false);
const { login } = useDirectusAuth();
const router = useRouter();

const onSubmit = async () => {
  try {
    await login({ email: email.value, password: password.value });
    router.push("/");
  } catch (e) {}
};
</script>
