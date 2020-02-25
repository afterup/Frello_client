import { OPEN_MODAL, CLOSE_MODAL } from '@/store/actions.type';

const state = {
	showModal: false,
};

const getters = {
	showModal(state) {
		return state.showModal;
	},
};

const mutations = {
	[OPEN_MODAL](state) {
		state.showModal = true;
	},
	[CLOSE_MODAL](state) {
		state.showModal = false;
	},
};

export default {
	state,
	getters,
	mutations,
};
