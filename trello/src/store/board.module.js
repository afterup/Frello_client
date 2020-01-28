import Vue from 'vue';
import { ApiService } from '@/common/api.service.js';
import JwtService from '@/common/jwt.service.js';

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
};

const actions = {
	/* BOARD */
	async FETCH_BOARDS({ commit }) {
		try {
			console.log(JwtService.getToken());
			const { data } = await ApiService.get(
				`/board?authorization=${JwtService.getToken()}`,
			);
			console.log(data);
			commit('SET_BOARDS', data.boards);
		} catch (err) {
			console.log(err.response);
		}
	},
	async FETCH_BOARD({ commit, rootState }, id) {
		try {
			const { data } = await ApiService.get(`/board/${id}`);
			console.log(data.board);

			const { board_id, title, background, favorite, user_id } = data.board;
			commit('SET_BOARD', {
				board_id,
				title,
				background,
				favorite,
				user_id,
			});

			rootState.task.lists = data.board.Lists;
		} catch (err) {
			console.log(err);
		}
	},
	async PUBLISH_BOARD({ commit }, board) {
		try {
			const { data } = await ApiService.post('/board', { board: board });
			return data;
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async UPDATE_BOARD({ commit }, board) {
		try {
			console.log(board);
			const { data } = await ApiService.put(`/board/${board.board_id}`, {
				board: board,
			});
			commit('CHANGE_BOARD', board);
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async DELETE_BOARD({ commit }, id) {
		try {
			const { data } = await ApiService.delete(`/board/${id}`);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
	/* FAVORITE */
	async PUBLISH_FAVORITE_BOARD({ commit }, payload) {
		const { data } = await ApiService.put(`/board/${payload.id}/favorite`, {
			favorite: payload.favorite,
		});
		console.log(data);
	},
};

const mutations = {
	/* BOARD */
	SET_BOARDS(state, boards) {
		state.boards = boards;
	},
	SET_BOARD(state, board) {
		state.board = board;
	},
	CHANGE_BOARD(state, board) {
		if (board.title) {
			state.board.title = board.title;
		}
		if (board.background) {
			state.board.background = board.background;
		}
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
