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
	async signup({ commit }, authData) {
		try {
			const { data } = await ApiService.post('/signup', { user: authData });
			console.log(data.user);
			commit('SET_USER_DATA', data.user);
			commit('SET_TOKEN', data.token);
			commit('SET_ERROR', null);
		} catch (error) {
			commit('SET_ERROR', error.response.data.error);
			throw new Error(error);
		}
	},
	async login({ commit }, user) {
		console.log(user);
		const { data } = await ApiService.post('/login', { user: user });
		commit('SET_USER_DATA', data.user);
		commit('SET_TOKEN', data.token);
		commit('SET_ERROR', null);

		return data.user;
	},
	LOGOUT({ commit }) {
		commit('SET_USER_DATA', null);
		commit('SET_TOKEN', null);
	},
};

const mutations = {
	SET_USER_DATA(state, user) {
		state.isAuthenticated = !state.isAuthenticated;
		state.user = user;
	},
	SET_TOKEN(state, token) {
		ApiService.setHeader(token);
		JwtService.saveToken(token);
	},
	SET_ERROR(state, error) {
		state.error = error;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
