import "./assets/main.css";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import { createApp } from "vue";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue);

app.mount("#app");
