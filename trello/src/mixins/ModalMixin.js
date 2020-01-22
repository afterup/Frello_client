import store from '@/store/modal.module.js';

export default ModalMixin = {
	computed: {
		showModal() {
			return store.getters('showModal');
		},
	},
	methods: {
		closeModal(type) {
			store.commit('CLOSE_MODAL');
		},
	},
};
