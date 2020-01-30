import Vue from 'vue';
import { ApiService } from '@/common/api.service.js';
import JwtService from '@/common/jwt.service.js';

const state = {
	user: {
		user_id: '',
		email: '',
		username: '',
		createdAt: '',
	},
	isAuthenticated: false,
	error: null,
};

const getters = {
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	currentUser(state) {
		return state.user;
	},
	error(state) {
		return state.error;
	},
};

const actions = {
	async AUTO_LOGIN({ commit }) {
		try {
			if (JwtService.getToken()) {
				const { data } = await ApiService.get('/user');
				commit('SET_USER_DATA', data.user);
			}
		} catch (err) {
			console.log(err.response);
		}
	},
	async signup({ commit }, authData) {
		try {
			const { data } = await ApiService.post('/user', { user: authData });
			console.log(data);
			return data;
		} catch (error) {
			commit('SET_ERROR', error.response.data.error.message);
		}
	},
	async login({ commit }, user) {
		try {
			const { data } = await ApiService.post('/user/login', user);
			commit('SET_USER_DATA', data.user.user);
			commit('SET_TOKEN', data.user.token);
			// dispatch('SET_EXPIRATION', data.expiresIn);

			return data.user.user;
		} catch (err) {
			console.log(err.response);
		}
	},
	SET_EXPIRATION({ commit }, expiresIn) {
		const now = new Date();
		const expirationDate = new Date(now.getTime() + expiresIn * 1000);
		localStorage.setItem('expirationDate', expirationDate);

		setTimeout(() => {
			commit('CLEAR_USER_DATA');
		}, expirationDate * 1000);
	},
	LOGOUT({ commit }) {
		commit('CLEAR_USER_DATA');
		JwtService.destroyToken();
	},
};

const mutations = {
	SET_USER_DATA(state, user) {
		state.user = user;
		state.error = null;
		state.isAuthenticated = true;
	},
	SET_TOKEN(state, token) {
		JwtService.saveToken(token);
		ApiService.setHeader(token);
	},
	SET_ERROR(state, error) {
		state.error = error;
	},
	CLEAR_USER_DATA(state) {
		state.user = null;
		state.isAuthenticated = false;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
