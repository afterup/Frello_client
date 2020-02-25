import Vue from 'vue';
import router from './router';

import App from './App.vue';
import store from './store';
import Vuelidate from 'vuelidate';

import { ApiService } from '@/services/api.service.js';

import '@/components/ui/index.js';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.use(Vuelidate);

Vue.component('loading-indicator', () =>
	import('@/components/ui/LoadingIndicator'),
);

ApiService.init();

router.beforeEach((to, from, next) => {
	next();
});

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
