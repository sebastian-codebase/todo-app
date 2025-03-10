import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// PrimeVue styles
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

// PrimeVue imports
import PrimeVue from "primevue/config";
import MainButton from "primevue/button";
import InputText from "primevue/inputtext";
import CheckBox from "primevue/checkbox";
import DialogOverlay from "primevue/dialog";

const app = createApp(App).use(store).use(router);

app.use(PrimeVue, { ripple: true });
app.component("MainButton", MainButton);
app.component("InputText", InputText);
app.component("CheckBox", CheckBox);
app.component("DialogOverlay", DialogOverlay);

app.mount("#app");
