<template>
	<!-- <div :class="board.background"> -->
	<div class="board-page">
		<BaseContainer :board="true" :background="board.background">
			<BoardMeta slot="meta" :board="board" :currentUser="currentUser" />
			<Columns :lists="lists" />
			<Modal v-if="showModal" @close="closeModal">
				<router-view></router-view>
			</Modal>
		</BaseContainer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
	data() {
		return {};
	},
	components: {
		BoardMeta: () => import('@/components/board/BoardMeta.vue'),
		Columns: () => import('@/components/board/Columns.vue'),
	},
	beforeRouteEnter(to, from, next) {
		store.dispatch('FETCH_BOARD', to.params.id).then(() => {
			next();
		});
	},
	computed: {
		...mapGetters(['board', 'lists', 'currentUser', 'showModal']),
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';
</style>
