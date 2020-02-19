import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { API_URL } from '@/common/config';
import JwtService from '@/services/jwt.service';

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

export const BoardService = {
	getBoards() {
		return ApiService.get('/api/board');
	},

	getBoard(id) {
		return ApiService.get(`/api/board/${id}`);
	},

	createBoard(resource) {
		return ApiService.post(`/api/board`, resource);
	},

	updateBoard(id, resource) {
		return ApiService.put(`/api/board/${id}`, resource);
	},

	deleteBoard(id) {
		return ApiService.delete(`/api/board/${id}`);
	},

	publishFavoriteBoard(id, resource) {
		return ApiService.put(`/api/board/${id}/favorite`, resource);
	},
};

export const ListService = {
	createList(resource) {
		return ApiService.post('/api/list', resource);
	},
	updateList(id, resource) {
		return ApiService.put(`/api/list/${id}`, resource);
	},
	deleteList(id) {
		return ApiService.delete(`/api/list/${id}`);
	},
};

export const CardService = {
	getCard(id) {
		return ApiService.get(`/api/card/${id}`);
	},
	createCard(resource) {
		return ApiService.post('/api/card', resource);
	},
	updateCard(id, resource) {
		return ApiService.put(`/api/card/${id}`, resource);
	},
	deleteCard(id) {
		return ApiService.delete(`/api/card/${id}`);
	},
};
