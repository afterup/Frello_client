<template>
	<div class="boards-wrap">
		<BoardsList :boards="favorites" :badge="'star_border'" />
		<BoardsList :boards="boards" :badge="'person'" :type="'personal'" />
		<Modal v-if="showModal" :type="'base'" @close="closeModal">
			<Post @close="closeModal" />
		</Modal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'boards-page',
	components: {
		BoardsList: () => import('@/components/boards/BoardsList.vue'),
		Modal: () => import('@/components/modal/Modal.vue'),
		Post: () => import('@/components/boards/Post.vue'),
	},
	created() {
		this.$store.dispatch('FETCH_BOARDS');
	},
	computed: {
		...mapGetters(['boards', 'showModal']),
		favorites() {
			let favorites = [];
			this.boards.find(board => {
				if (board.favorite) favorites.push(board);
			});
			return favorites;
		},
	},
	methods: {
		closeModal() {
			this.$store.commit('CLOSE_MODAL');
		},
	},
};
</script>

<style lang="scss" scoped>
.boards-wrap {
	width: 100rem;
	margin: 5rem auto;

	@media screen and (max-width: $bp-largest) {
		width: 90rem;
	}

	@media screen and (max-width: $bp-small) {
		width: 55rem;
	}
}
</style>
