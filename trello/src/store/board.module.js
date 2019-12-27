import { ApiService } from '@/common/api.service.js';

const state = {
	boards: {},
};

const getters = {
	boards() {
		return state.boards;
	},
};

const actions = {
	async FETCH_BOARDS({ commit }) {
		try {
			const { data } = await ApiService.get('board');
			commit('SET_BOARDS', data);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
	async PUBLISH_BOARD({ commit }, board) {
		try {
			const { data } = await ApiService.post('board', board);
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
};

export default {
	state,
	getters,
	actions,
	mutations,
};
