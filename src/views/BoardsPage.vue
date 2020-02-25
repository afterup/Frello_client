<template>
	<div class="boards-wrap">
		<loading-indicator v-if="isBoardLoading" />
		<BoardsList :boards="favorites" :badge="'star_border'" />
		<BoardsList :boards="boards" :badge="'person'" :type="'personal'" />
		<Modal v-if="showModal" :type="'base'" @close="closeModal">
			<Post @close="closeModal" />
		</Modal>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import {
	FETCH_BOARDS,
	FETCH_FAVORITES,
	RESET_STATE_BOARD,
} from '@/store/actions.type.js';
import { CLOSE_MODAL } from '@/store/mutations.type.js';
export default {
	name: 'boards-page',
	components: {
		BoardsList: () => import('@/components/boards/BoardsList.vue'),
		Modal: () => import('@/components/modal/Modal.vue'),
		Post: () => import('@/components/boards/Post.vue'),
	},
	created() {
		this.$store.dispatch(FETCH_BOARDS).then(() => {
			this.$store.dispatch(FETCH_FAVORITES);
		});
	},
	beforeRouterLeaver() {
		this.$store.dispatch(RESET_STATE_BOARD);
	},
	computed: {
		...mapGetters(['boards', 'showModal', 'favorites', 'isBoardLoading']),
	},
	methods: {
		closeModal() {
			this.$store.commit(CLOSE_MODAL);
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
