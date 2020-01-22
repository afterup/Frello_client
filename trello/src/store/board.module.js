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
};

const actions = {
	/* BOARD */
	async FETCH_BOARDS({ commit }) {
		try {
			const { data } = await ApiService.get(`/board`);
			console.log(data);
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

	/* LIST */
	async PUBLISH_LIST({ commit }, list) {
		try {
			const { data } = await ApiService.post('/list', { list: list });
			console.log(data);
			data.list['Cards'] = [];
			commit('ADD_LIST', data.list);
			return data;
		} catch (err) {
			console.log(err);
		}
	},
	async UPDATE_LIST({ commit }, list) {
		const { data } = await ApiService.put(`/list/${list.list_id}`, {
			list: list,
		});
		commit('CHANGE_LIST', list);
	},
	async DELETE_LIST({ commit }, id) {
		try {
			const { data } = await ApiService.delete(`/list/${id}`);
			commit('DELETE_COLUMN_LIST', id);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
	async MOVE_LIST({ commit, state }, { element, oldIndex, newIndex }) {
		try {
			console.log(element);
			let bothList = {};

			if (state.board.Lists[newIndex - 1]) {
				bothList['leftListPosition'] = state.board.Lists[newIndex - 1].position;
			}

			if (state.board.Lists[newIndex + 1]) {
				bothList['rightListPosition'] =
					state.board.Lists[newIndex + 1].position;
			}

			const { data } = await ApiService.put(`/list/${element.list_id}`, {
				list: {
					bothList,
				},
			});
			commit('MOVE_SAVE_LIST', {
				list: data.list,
				idx: newIndex,
			});
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	},
	/* CARD */
	async PUBLISH_CARD({ commit }, card) {
		const { data } = await ApiService.post('/card', { card: card });
		console.log(data);
		commit('ADD_CARD', data.card);
	},
};

const mutations = {
	SET_BOARDS(state, boards) {
		state.boards = boards;
	},
	SET_BOARD(state, board) {
		state.board = board;
	},
	ADD_LIST(state, list) {
		state.board.Lists.push(list);
	},
	ADD_CARD(state, card) {
		const list = state.board.Lists.find(list => list.list_id === card.list_id);
		if (list) list.Cards.push(card);
	},
	CHANGE_BOARD(state, board) {
		if (board.title) {
			state.board.title = board.title;
		}
		if (board.background) {
			state.board.background = board.background;
		}
	},
	CHANGE_LIST(state, list) {
		if (list.title) {
			state.board.Lists.find((oldList, idx) => {
				if (oldList.list_id === list.list_id) {
					oldList['title'] = list.title;
				}
			});
		}
	},
	MOVE_SAVE_LIST(state, payload) {
		state.board.Lists[payload.idx] = payload.list;
	},
	DELETE_COLUMN_LIST(state, id) {
		const index = state.board.Lists.findIndex(
			(list, idx) => list.list_id === id,
		);
		state.board.Lists.splice(index, 1);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
