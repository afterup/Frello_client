import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ApiService } from '@/common/api.service.js';

Vue.config.productionTip = false;

Vue.component('BaseContainer', () => import('@/components/ui/BaseContainer'));
Vue.component('BaseBtn', () => import('@/components/ui/BaseBtn'));
Vue.component('BaseTitleInput', () => import('@/components/ui/BaseTitleInput'));
Vue.component('Modal', () => import('@/components/ui/Modal'));

ApiService.init();

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
