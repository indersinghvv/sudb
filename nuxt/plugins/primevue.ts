import PrimeVue from "primevue/config";

// components
import Button from "primevue/button";
import Tooltip from "primevue/tooltip";
import InputText from "primevue/inputtext";

import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";

export default defineNuxtPlugin((nuxtApp) => {
  const app = nuxtApp.vueApp;
  app.use(PrimeVue);
  app.use(ConfirmationService);
  app.use(ToastService);

  // components
  app.component("Button", Button);
  app.component("InputText", InputText);

  //directives
  app.directive("tooltip", Tooltip);
});
