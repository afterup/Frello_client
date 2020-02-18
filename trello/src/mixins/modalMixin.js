import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['showModal']),
	},
	methods: {
		closeModal(route) {
			this.$store.commit('CLOSE_MODAL');
			this.$router.push({ name: route });
		},
	},
};
