<template>
  <div class="flex flex-row align-items-center justify-content-center h-screen">
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
      <div class="text-center mb-5">
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3">
          Don't have an account?
        </span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
          Create today!
        </a>
      </div>
      <div>
        <label for="email1" class="block text-900 font-medium mb-2">
          Email
        </label>
        <InputText
          id="email1"
          type="text"
          class="w-full mb-3"
          v-model="email"
        />

        <label for="password1" class="block text-900 font-medium mb-2">
          Password
        </label>
        <InputText
          id="password1"
          type="password"
          class="w-full mb-3"
          v-model="password"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center">
            <Checkbox
              id="rememberme1"
              :binary="true"
              v-model="checked"
              class="mr-2"
            >
            </Checkbox>
            <label for="rememberme1">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?
          </a>
        </div>

        <Button label="Sign In" class="w-full" @click="onSubmit"></Button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";
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
