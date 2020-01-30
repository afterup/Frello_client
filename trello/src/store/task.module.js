import { ApiService } from '@/common/api.service.js';

const state = {
	lists: [],
};

const getters = {
	lists(state) {
		return state.lists;
	},
};

const actions = {
	/* LIST */
	async PUBLISH_LIST({ commit }, list) {
		try {
			const { data } = await ApiService.post('/list', { list: list });
			commit('ADD_LIST', data.list);
		} catch (err) {
			console.log(err);
		}
	},
	async UPDATE_LIST({ commit }, list) {
		const { data } = await ApiService.put(`/list/${list.list_id}`, {
			list: { title: list.title },
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
			let bothItem = {};

			if (state.lists[newIndex - 1]) {
				bothItem['leftPosition'] = state.lists[newIndex - 1].position;
			}

			if (state.lists[newIndex + 1]) {
				bothItem['rightPosition'] = state.lists[newIndex + 1].position;
			}

			const { data } = await ApiService.put(`/list/${element.list_id}`, {
				list: {
					bothItem,
				},
			});
			commit('MOVE_SAVE_LIST', {
				list: data.list,
				oldIndex,
				newIndex,
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

	async MOVE_CARD({ commit, state }, { evt }) {
		function findBothPosition(listId, index) {
			const cards = state.lists.find(list => list.list_id === listId).Cards;
			let bothItem = {};
			if (cards[index - 1]) {
				bothItem['leftPosition'] = cards[index - 1].position;
			}
			if (cards[index + 1]) {
				bothItem['rightPosition'] = cards[index + 1].position;
			}
			return bothItem;
		}

		try {
			const { relatedContext, draggedContext } = evt;

			const bothItem = findBothPosition(
				draggedContext.element.list_id,
				relatedContext.index,
			);

			const { data } = await ApiService.put(
				`/card/${draggedContext.element.card_id}`,
				{
					card: {
						bothItem,
						listId: draggedContext.element.list_id,
					},
				},
			);

			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},
};

const mutations = {
	/* LIST */
	ADD_LIST(state, list) {
		state.lists.push(list);
	},
	CHANGE_LIST(state, list) {
		if (list.title) {
			state.lists.find((oldList, idx) => {
				if (oldList.list_id === list.list_id) {
					oldList['title'] = list.title;
				}
			});
		}
	},
	MOVE_SAVE_LIST(state, { list, oldIndex, newIndex }) {
		// console.log(state.board.Lists[newIndex]);
		state.lists[newIndex].position = list.position;
	},
	DELETE_COLUMN_LIST(state, id) {
		const index = state.lists.findIndex((list, idx) => list.list_id === id);
		state.lists.splice(index, 1);
	},
	/* CARD */
	ADD_CARD(state, card) {
		const list = state.lists.find(list => list.list_id === card.list_id);
		if (list) list.Cards.push(card);
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
