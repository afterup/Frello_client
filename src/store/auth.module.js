import { ApiService } from '@/services/api.service.js';
import JwtService from '@/services/jwt.service.js';

const state = {
	user: {},
	isAuthenticated: false,
};

const getters = {
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	currentUser(state) {
		return state.user;
	},
};

const actions = {
	async AUTO_LOGIN({ commit }) {
		try {
			if (JwtService.getToken()) {
				const { data } = await ApiService.get('/api/user');
				commit('SET_USER_DATA', data.user);
			}
		} catch (err) {
			console.log(err.response);
		}
	},
	async signup({ commit }, authData) {
		try {
			const { data } = await ApiService.post('/api/user', { user: authData });
		} catch (err) {
			console.log(err.response);
		}
	},
	async login({ commit }, user) {
		try {
			const { data } = await ApiService.post('/api/user/login', user);
			commit('SET_USER_DATA', data.user.user);
			commit('SET_TOKEN', data.user.token);

			if (data.error) return console.log(data);

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
		state.isAuthenticated = true;
	},
	SET_TOKEN(state, token) {
		JwtService.saveToken(token);
		ApiService.setHeader(token);
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
