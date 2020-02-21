import { ListService, CardService } from '@/services/api.service.js';

const state = {
	lists: [],
	card: {},
};

const getters = {
	lists(state) {
		return state.lists;
	},
	card(state) {
		return state.card;
	},
};

const actions = {
	/* LIST */
	async PUBLISH_LIST({ commit }, list) {
		try {
			const { data } = await ListService.createList({ list: list });
			commit('ADD_LIST', data.list);
		} catch (err) {
			console.log(err);
		}
	},
	async UPDATE_LIST({ commit }, list) {
		const { data } = await ListService.updateList(list.list_id, {
			list: { title: list.title },
		});
		commit('CHANGE_LIST', list);
	},
	async DELETE_LIST({ commit }, id) {
		try {
			const { data } = await ListService.deleteList(id);
			commit('DELETE_COLUMN_LIST', id);
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	},

	/* CARD */
	async FETCH_CARD({ commit }, id) {
		const { data } = await CardService.getCard(id);
		console.log(data);
		commit('SET_CARD', data.card);
	},
	async PUBLISH_CARD({ commit }, card) {
		const { data } = await CardService.createCard({ card: card });
		console.log(data);
		commit('ADD_CARD', data.card);
	},
	async UPDATE_CARD({ commit }, card) {
		const { listId, cardId, description, title } = card;
		let value = {};
		if (description) {
			value.description = description;
		} else if (title) {
			value.title = title;
		}
		const { data } = await CardService.updateCard(cardId, {
			card: value,
		});
		console.log(data);
		commit('CHANGE_CARD', card);
	},
	async DELETE_CARD({ commit }, id) {
		const { data } = await CardService.deleteCard(id);
		console.log(data);
		commit('REMOVE_CARD', id);
	},
	/* MOVE */
	async MOVE_CARD(
		{ commit, state },
		{ fromListIndex, fromCardIndex, toListIndex, toCardIndex },
	) {
		function findBothPosition(toCards) {
			let bothPosition = {};
			if (toCards[toCardIndex - 1]) {
				bothPosition['leftPosition'] = toCards[toCardIndex - 1].position;
			}
			if (toCards[toCardIndex + 1]) {
				bothPosition['rightPosition'] = toCards[toCardIndex + 1].position;
			}
			return bothPosition;
		}

		try {
			const fromCards = state.lists[fromListIndex].Cards;
			const toCards = state.lists[toListIndex].Cards;
			const listId = state.lists[toListIndex].list_id;

			commit('MOVE_TASK_CARD', {
				fromCards,
				fromCardIndex,
				toCards,
				toCardIndex,
			});
			console.log(toCardIndex);

			let cardId;
			let bothPosition;
			if (toCardIndex !== undefined) {
				cardId = toCards[toCardIndex].card_id;
				bothPosition = findBothPosition(toCards);
			} else {
				cardId = toCards[0].card_id;
			}
			console.log(bothPosition);

			const { data } = await CardService.updateCard(cardId, {
				card: {
					bothPosition,
					listId: listId,
				},
			});
			console.log(data);
			commit('SET_CARD_POSITION', data.card);
		} catch (err) {
			console.log(err);
		}
	},
	async MOVE_LIST({ commit, state }, { fromListIndex, toListIndex }) {
		function findBothPosition() {
			let bothPosition = {};
			if (state.lists[toListIndex - 1]) {
				bothPosition['leftPosition'] = state.lists[toListIndex - 1].position;
			}
			if (state.lists[toListIndex + 1]) {
				bothPosition['rightPosition'] = state.lists[toListIndex + 1].position;
			}
			return bothPosition;
		}
		try {
			const listId = state.lists[fromListIndex].list_id;
			commit('MOVE_COLUMN_LIST', {
				fromListIndex,
				toListIndex,
			});
			const bothPosition = findBothPosition();

			const { data } = await ListService.updateList(listId, {
				list: { bothPosition, board_id: state.lists[fromListIndex].board_id },
			});
			console.log(data);
			commit('SET_LIST_POSITION', data.list);
		} catch (error) {
			console.log(error);
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
				if (oldList.list_id === list.list_id) oldList['title'] = list.title;
			});
		}
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
	SET_CARD(state, card) {
		state.card = card;
	},
	CHANGE_CARD(state, card) {
		const { cardId, title, description } = card;
		if (title) {
			state.card['title'] = title;
			state.lists.forEach(list => {
				list.Cards.find(listCard => {
					if (listCard.card_id === cardId) listCard['title'] = title;
				});
			});
		} else {
			state.card['description'] = description;
		}
	},
	REMOVE_CARD(state, id) {
		state.lists.forEach(list => {
			const cardIndex = list.Cards.findIndex(card => card.card_id === id);
			if (cardIndex != -1) list.Cards.splice(cardIndex, 1);
		});
		state.card = '';
	},
	DESTROY_CARD(state) {
		state.card = {};
	},
	/* MOVE */
	MOVE_TASK_CARD(state, { fromCards, fromCardIndex, toCards, toCardIndex }) {
		const cardToMove = fromCards.splice(fromCardIndex, 1)[0];
		toCards.splice(toCardIndex, 0, cardToMove);
	},
	MOVE_COLUMN_LIST(state, { fromListIndex, toListIndex }) {
		const list = state.lists;
		const listToMove = list.splice(fromListIndex, 1)[0];
		list.splice(toListIndex, 0, listToMove);
	},
	SET_CARD_POSITION(state, newCard) {
		const list = state.lists.find(list => list.list_id === newCard.list_id);
		const cardIndex = list.Cards.findIndex(
			card => card.card_id === newCard.card_id,
		);
		list.Cards[cardIndex] = newCard;
	},
	SET_LIST_POSITION(state, newList) {
		const listIndex = state.lists.findIndex(
			list => list.list_id === newList.list_id,
		);
		state.lists[listIndex].position = newList.position;
	},
};

export default {
	state,
	getters,
	actions,
	mutations,
};
