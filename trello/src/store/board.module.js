import Vue from 'vue';
import { ApiService } from '@/common/api.service.js';

const state = {
	boards: [],
	favorites: [],
	board: {},
	error: null,
};

const getters = {
	boards(state) {
		return state.boards;
	},
	board(state) {
		return state.board;
	},
	favorites(state) {
		return state.favorites;
	},
};

const actions = {
	async FETCH_BOARDS({ commit }) {
		try {
			const { data } = await ApiService.get(`/board`);
			commit('SET_BOARDS', data.boards);
		} catch (err) {
			console.log(err.response);
		}
	},
	async FETCH_BOARD({ commit }, id) {
		try {
			const { data } = await ApiService.get(`/board/${id}`);
			commit('SET_BOARD', data.board);
		} catch (err) {
			console.log(err);
		}
	},
	async PUBLISH_BOARD({ commit }, board) {
		try {
			const { data } = await ApiService.post('/board', { board: board });
			console.log(data);
			return data;
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async PUBLISH_LIST({ commit }, list) {
		try {
			console.log(list);

			const { data } = await ApiService.post('/list', { list: list });
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
};

const mutations = {
	SET_BOARDS(state, boards) {
		state.boards = boards;
	},
	SET_BOARD(state, board) {
		state.board = board;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
