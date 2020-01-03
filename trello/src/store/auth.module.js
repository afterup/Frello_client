import { ApiService } from '@/common/api.service.js';
import JwtService from '@/common/jwt.service.js';

const state = {
	user: {
		id: '',
		email: '',
		username: '',
		photo: '',
		created_at: '',
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
			const user = await ApiService.post('/signup', authData);
			return user;
		} catch (error) {
			const response = error.response;
			console.log(response);
			commit('SET_ERROR', error.data);
			return error;
		}
	},
	async login({ commit }, user) {
		console.log(user);
		const { data } = await axios.post('/login', user);
		commit('SET_USER_DATA', data.user);
		commit('SET_TOKEN', data.token);
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
