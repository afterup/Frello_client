import { BoardService } from '@/services/api.service.js';
import {
	FETCH_BOARDS,
	FETCH_BOARD,
	FETCH_FAVORITES,
	PUBLISH_BOARD,
	UPDATE_BOARD,
	DELETE_BOARD,
	PUBLISH_FAVORITE_BOARD,
	RESET_STATE_BOARD,
} from '@/store/actions.type.js';
import {
	SET_BOARDS,
	SET_BOARD,
	SET_FAVORITES,
	SET_FAVORITE,
	CHANGE_BOARD,
	RESET_BOARD,
} from '@/store/mutations.type.js';
import { dateFormat } from '@/common/util';

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
	/* BOARD */
	async [FETCH_BOARDS]({ commit }) {
		try {
			const { data } = await BoardService.getBoards();
			commit(SET_BOARDS, data.boards);
		} catch (err) {
			console.log(err.response);
		}
	},
	[FETCH_FAVORITES]({ commit }) {
		commit(SET_FAVORITES);
	},
	async [FETCH_BOARD]({ commit, rootState }, id) {
		try {
			const { data } = await BoardService.getBoard(id);
			const {
				board_id,
				title,
				background,
				favorite,
				createdAt,
				user_id,
			} = data.board;

			const createdAtFormat = dateFormat(createdAt);
			commit(SET_BOARD, {
				board_id,
				title,
				background,
				favorite,
				user_id,
				createdAt: createdAtFormat,
				username: data.board.User.username,
			});

			rootState.task.lists = data.board.Lists;
		} catch (err) {
			console.log(err);
		}
	},
	async [PUBLISH_BOARD]({ commit }, board) {
		try {
			const { data } = await BoardService.createBoard({ board: board });
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async [UPDATE_BOARD]({ commit }, board) {
		try {
			const { data } = await BoardService.updateBoard(board.board_id, {
				board,
			});
			commit(CHANGE_BOARD, data.board);
		} catch (err) {
			console.log(err.response.data);
		}
	},
	async [DELETE_BOARD]({ commit }, id) {
		BoardService.deleteBoard(id).catch(err => {
			console.log(err);
		});
	},
	/* FAVORITE */
	[PUBLISH_FAVORITE_BOARD]({ commit }, payload) {
		BoardService.publishFavoriteBoard(payload.id, {
			favorite: payload.favorite,
		}).then(() => {
			commit(SET_FAVORITE);
		});
	},
	[RESET_STATE_BOARD]({ commit }) {
		commit(RESET_BOARD);
	},
};

const mutations = {
	/* BOARD */
	[SET_BOARDS](state, boards) {
		state.boards = boards;
	},
	[SET_BOARD](state, board) {
		state.board = board;
	},
	[SET_FAVORITES](state) {
		let favorites = [];
		state.boards.find(board => {
			if (board.favorite) favorites.push(board);
		});
		state.favorites = favorites;
	},
	[SET_FAVORITE](state, id) {
		state.board.favorite = !state.board.favorite;
	},
	[CHANGE_BOARD](state, board) {
		if (board.title) {
			state.board.title = board.title;
		}
		if (board.background) {
			state.board.background = board.background;
		}
	},
	[RESET_BOARD](state) {
		state.board = {};
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
