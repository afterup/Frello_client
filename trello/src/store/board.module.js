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
	async FETCH_FAVORITE_BOARDS({ commit }) {
		const { data } = await ApiService.get(`/favorite`);
		commit('SET_FAVORITES', data.favorite);
	},
	async PUBLISH_FAVORITE_BOARD({ commit }, id) {
		const { data } = await ApiService.post(`/board/${id}/favorite`);
		console.log(data);
	},
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
		console.log(list);
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
	SET_FAVORITES(state, favorites) {
		state.favorites = favorites;
	},
	ADD_LIST(state, list) {
		state.board.Lists.push(list);
	},
	ADD_CARD(state, card) {
		state.board.Lists.find((list, idx) => {
			if (list.list_id === card.list_id) {
				list.Cards.push(card);
			}
		});
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
	DELETE_COLUMN_LIST(state, id) {
		state.board.Lists.find((list, idx) => {
			if (list.list_id === id) {
				delete state.board.Lists[idx];
			}
		});
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
