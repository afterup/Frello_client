import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import JwtService from '@/common/jwt.service.js';
import { ApiService } from '../common/api.service';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		user: {
			id: '',
			email: '',
			username: '',
			photo: '',
			created_at: '',
		},
		isAuthenticated: false,
		error: null,
	},
	getters: {
		isAuthenticated(state) {
			return state.isAuthenticated;
		},
		currentUser(state) {
			return state.user;
		},
		error(state) {
			return state.error;
		},
	},
	mutations: {
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
	},
	actions: {
		async signup({ commit }, authData) {
			try {
				const user = await axios.post('/signup', authData);
				return user;
			} catch (error) {
				commit('SET_ERROR', error.response.data.error);
				return error.response.data;
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
	},
	modules: {},
});
