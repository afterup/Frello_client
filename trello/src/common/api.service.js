import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from '@/common/config';
import JwtService from '@/common/jwt.service';

export const ApiService = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
		Vue.axios.defaults.headers.common['Authorization'] = JwtService.getToken();
	},

	setHeader() {
		Vue.axios.defaults.headers.common[
			'Authorization'
		] = `${JwtService.getToken()}`;
	},

	get(resource) {
		return Vue.axios.get(`${resource}`);
	},

	post(resource, payload) {
		return Vue.axios.post(`${resource}`, payload);
	},

	delete(resource) {
		return Vue.axios.delete(`${resource}`);
	},

	put(resource, payload) {
		return Vue.axios.put(`${resource}`, payload);
	},
};
