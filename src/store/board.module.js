import { BoardService } from '@/services/api.service.js';

import JwtService from '@/services/jwt.service.js';

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
			const { data } = await BoardService.getBoards();
			commit('SET_BOARDS', data.boards);
		} catch (err) {
			console.log(err.response);
		}
	},
	async FETCH_BOARD({ commit, rootState }, id) {
		function dateFormat(date) {
			const array = date.split('-');
			const year = array[0];
			const month = array[1];
			const day = array[2].split('T')[0];
			const time = array[2].split('T')[1].split('.')[0];

			return `${year}-${month}-${day} ${time}`;
		}

		try {
			const { data } = await BoardService.getBoard(id);
			console.log(data);
			const {
				board_id,
				title,
				background,
				favorite,
				createdAt,
				user_id,
			} = data.board;

			const createdAtFormat = dateFormat(createdAt);

			commit('SET_BOARD', {
				board_id,
				title,
				background,
				favorite,
				user_id,
				createdAt: createdAtFormat,
				username: data.board.User.username,
			});

			//SET lists at task.module
			rootState.task.lists = data.board.Lists;
		} catch (err) {
			console.log(err);
		}
	},
	async PUBLISH_BOARD({ commit }, board) {
		try {
			console.log(board);
			const { data } = await BoardService.createBoard({ board: board });
			return data;
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async UPDATE_BOARD({ commit }, board) {
		try {
			console.log(board);
			const { data } = await BoardService.updateBoard(board.board_id, {
				board,
			});
			commit('CHANGE_BOARD', board);
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async DELETE_BOARD({ commit }, id) {
		try {
			const { data } = await BoardService.deleteBoard(id);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
	/* FAVORITE */
	async PUBLISH_FAVORITE_BOARD({ commit }, payload) {
		const { data } = await BoardService.publishFavoriteBoard(payload.id, {
			favorite: payload.favorite,
		});
		commit('SET_FAVORITE');
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
	SET_FAVORITE(state, id) {
		state.board.favorite = !state.board.favorite;
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
