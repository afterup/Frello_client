import { ApiService } from '@/common/api.service.js';

const state = {
	boards: {},
	error: null,
};

const getters = {
	boards() {
		return state.boards;
	},
};

const actions = {
	async FETCH_BOARDS({ commit }, username) {
		try {
			const { data } = await ApiService.get(`/boards/${username}`);
			commit('SET_BOARDS', data);
			console.log(data);
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async PUBLISH_BOARD({ commit }, board) {
		try {
			const { data } = await ApiService.post('/board', { board: board });
			console.log(data);
		} catch (err) {
			console.log(err.response.data);
		}
	},
};

const mutations = {
	SET_BOARDS(state, boards) {
		state.boards = boards;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
