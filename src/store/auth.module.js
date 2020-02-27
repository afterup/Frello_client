import { ApiService } from '@/services/api.service.js';
import JwtService from '@/services/jwt.service.js';
import {
	CHECK_AUTH,
	SIGN_UP,
	LOGIN,
	LOGOUT,
	UPDATE_USER,
	DELETE_USER,
} from '@/store/actions.type.js';
import {
	SET_USER_DATA,
	SET_TOKEN,
	CLEAR_USER_DATA,
} from '@/store/mutations.type.js';

import { errorHandler } from '@/common/errorHandler.js';

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
	[CHECK_AUTH]({ commit }) {
		if (JwtService.getToken()) {
			ApiService.setHeader();
			ApiService.get('/api/user')
				.then(({ data }) => {
					commit(SET_USER_DATA, data.user);
				})
				.catch(({ response }) => {
					console.log(response.data.error);
				});
		} else {
			commit(CLEAR_USER_DATA);
		}
	},
	async [SIGN_UP]({ commit }, authData) {
		try {
			await ApiService.post('/api/user', { user: authData });
		} catch (err) {
			return errorHandler(err.response.data.error.message);
		}
	},
	async [LOGIN]({ commit }, loginUser) {
		try {
			const { data } = await ApiService.post('/api/user/login', loginUser);
			const { user, token } = data.user;
			commit(SET_USER_DATA, user);
			commit(SET_TOKEN, token);

			return user;
		} catch (err) {
			return errorHandler(err.response.data.error.message);
		}
	},
	[LOGOUT]({ commit }) {
		commit(CLEAR_USER_DATA);
	},
	[UPDATE_USER]({ commit }, payload) {
		ApiService.put('/user', payload)
			.then(({ data }) => {
				commit(SET_USER_DATA, data.user);
				return data;
			})
			.catch(({ response }) => {
				console.log(response.data.error);
			});
	},
	[DELETE_USER]({ commit, state }) {
		ApiService.delete('/user', state.user.username)
			.then(({ data }) => {})
			.catch(({ response }) => {
				console.log(response.data.error);
			});
	},
};

const mutations = {
	[SET_USER_DATA](state, user) {
		state.user = user;
		state.isAuthenticated = true;
	},
	[SET_TOKEN](state, token) {
		JwtService.saveToken(token);
		ApiService.setHeader(token);
	},
	[CLEAR_USER_DATA](state) {
		state.user = null;
		state.isAuthenticated = false;
		JwtService.destroyToken();
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
