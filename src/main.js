
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import './style.css'
//import 'primevue/resources/themes/saga-blue/theme.css'; //Theme
//import 'primevue/resources/primevue.min.css';           // Core CSS
import 'primeicons/primeicons.css';                     // Icons
import store from './store.js'
console.log('tsore', store)
const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            // darkModeSelector: 'system',
            cssLayer: false
        }
    }
 });
app.mount('#app');

