import { ListService, CardService } from '@/services/api.service.js';
import {
	PUBLISH_LIST,
	UPDATE_LIST,
	DELETE_LIST,
	FETCH_CARD,
	PUBLISH_CARD,
	UPDATE_CARD,
	DELETE_CARD,
	MOVE_CARD,
	MOVE_LIST,
} from '@/store/actions.type';
import {
	ADD_LIST,
	ADD_CARD,
	CHANGE_LIST,
	CHANGE_CARD,
	SET_CARD,
	REMOVE_CARD,
	MOVE_TASK_CARD,
	DELETE_COLUMN_LIST,
	MOVE_COLUMN_LIST,
	SET_LIST_POSITION,
	SET_CARD_POSITION,
} from '@/store/mutations.type';
import { dateFormat, findBothPosition } from '@/common/util';

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
	async [PUBLISH_LIST]({ commit }, list) {
		try {
			const { data } = await ListService.createList({ list: list });
			commit(ADD_LIST, data.list);
		} catch (err) {
			console.log(err);
		}
	},
	[UPDATE_LIST]({ commit }, list) {
		ListService.updateList(list.list_id, {
			list: { title: list.title },
		}).then(() => {
			commit(CHANGE_LIST, list);
		});
	},
	[DELETE_LIST]({ commit }, id) {
		try {
			ListService.deleteList(id).then(() => {
				commit(DELETE_COLUMN_LIST, id);
			});
		} catch (err) {
			console.log(err);
		}
	},
	async [FETCH_CARD]({ commit }, id) {
		const { data } = await CardService.getCard(id);
		data.card.createdAt = dateFormat(data.card.createdAt);

		commit(SET_CARD, data.card);
	},
	[PUBLISH_CARD]({ commit }, card) {
		CardService.createCard({ card: card }).then(({ data }) => {
			commit(ADD_CARD, data.card);
		});
	},
	async [UPDATE_CARD]({ commit }, card) {
		CardService.updateCard(card.cardId, { card: card }).then(() => {
			commit(CHANGE_CARD, card);
		});
	},
	[DELETE_CARD]({ commit }, id) {
		CardService.deleteCard(id).then(() => {
			commit(REMOVE_CARD, id);
		});
	},
	async [MOVE_CARD](
		{ commit, state },
		{ fromListIndex, fromCardIndex, toListIndex, toCardIndex },
	) {
		try {
			const fromCards = state.lists[fromListIndex].Cards; // 카드는 이미 이동되고 없음
			const toCards = state.lists[toListIndex].Cards; // 이동된 카드. 리스트 아이디는 이동된곳에 위치
			const listId = state.lists[toListIndex].list_id; //이동된 리스트아이디

			commit(MOVE_TASK_CARD, {
				fromCards,
				fromCardIndex,
				toCards,
				toCardIndex,
			});

			let cardId;
			let bothPosition;
			if (toCardIndex !== undefined) {
				cardId = toCards[toCardIndex].card_id;
				bothPosition = findBothPosition({
					elements: toCards,
					index: toCardIndex,
				});
			} else {
				cardId = toCards[0].card_id;
			}

			const { data } = await CardService.updateCard(cardId, {
				card: {
					bothPosition,
					listId: listId,
				},
			});
			commit(SET_CARD_POSITION, data.card);
		} catch (err) {
			console.log(err);
		}
	},
	async [MOVE_LIST]({ commit, state }, { fromListIndex, toListIndex }) {
		try {
			const listId = state.lists[fromListIndex].list_id;
			commit(MOVE_COLUMN_LIST, {
				fromListIndex,
				toListIndex,
			});
			const bothPosition = findBothPosition({
				elements: state.lists,
				index: toListIndex,
			});

			const { data } = await ListService.updateList(listId, {
				list: { bothPosition, board_id: state.lists[fromListIndex].board_id },
			});
			commit(SET_LIST_POSITION, data.list);
		} catch (error) {
			console.log(error);
		}
	},
};

const mutations = {
	[SET_CARD](state, card) {
		state.card = card;
	},
	[ADD_LIST](state, list) {
		state.lists.push(list);
	},
	[ADD_CARD](state, card) {
		state.lists.find(list => {
			if (list.list_id === card.list_id) list.Cards.push(card);
		});
	},
	[CHANGE_LIST](state, list) {
		if (list.title) {
			state.lists.find(oldList => {
				if (oldList.list_id === list.list_id) oldList['title'] = list.title;
			});
		}
	},
	[CHANGE_CARD](state, card) {
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
	[DELETE_COLUMN_LIST](state, id) {
		const index = state.lists.findIndex((list, idx) => list.list_id === id);
		state.lists.splice(index, 1);
	},
	[REMOVE_CARD](state, id) {
		state.lists.forEach(list => {
			const cardIndex = list.Cards.findIndex(card => card.card_id === id);
			if (cardIndex != -1) list.Cards.splice(cardIndex, 1);
		});
		state.card = '';
	},
	/* MOVE */
	[MOVE_TASK_CARD](state, { fromCards, fromCardIndex, toCards, toCardIndex }) {
		const cardToMove = fromCards.splice(fromCardIndex, 1)[0];
		toCards.splice(toCardIndex, 0, cardToMove);
	},
	[MOVE_COLUMN_LIST](state, { fromListIndex, toListIndex }) {
		const list = state.lists;
		const listToMove = list.splice(fromListIndex, 1)[0];
		list.splice(toListIndex, 0, listToMove);
	},
	[SET_CARD_POSITION](state, newCard) {
		const list = state.lists.find(list => list.list_id === newCard.list_id);
		const cardIndex = list.Cards.findIndex(
			card => card.card_id === newCard.card_id,
		);
		list.Cards[cardIndex] = newCard;
	},
	[SET_LIST_POSITION](state, newList) {
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
