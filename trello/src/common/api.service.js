import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from '@/common/config';
import JwtService from '@/common/jwt.service';

export const ApiService = {
	init() {
		Vue.use(VueAxios, axios);
		Vue.axios.defaults.baseURL = API_URL;
	},

	setHeader() {
		Vue.axios.defaults.headers.common[
			'Authorization'
		] = `Bearer ${JwtService.getToken()}`;
	},

	get(resource) {
		return Vue.axios.get(`${resource}`).catch(error => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},

	post(resource, params) {
		return Vue.axios.get(`${resource}`, params).catch(error => {
			throw new Error(`[RWV] ApiService ${error}`);
		});
	},
};