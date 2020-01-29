<template>
	<!-- <div :class="board.background"> -->
	<div class="board-page">
		<BaseContainer :type="'board-wrap'">
			<BoardMeta :board="board" :currentUser="currentUser" />
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

.card {
  width: 760px;
  height: 600px;
  background-color: #ebecf0;
  border-radius: 2px;
}

// .card__header {
// 	display: flex;
// }

// .card__header__title {
// 	font-size: 1.8rem;
// 	font-weight: bold;
// }

// .card__header__title__description {
// 	color: gray;
// 	font-size: 1.3rem;
// }

// .card__description {
// 	display: flex;
// 	flex-direction: row;
// 	margin-top: 20px;
// }

// .card__description__body {
// 	display: flex;
// 	flex-direction: column;
// 	font-size: 1.8rem;
// 	font-weight: bold;
// }

// .card__description__body__input {
// 	border: none;
// 	border-radius: 2px;
// 	background-color: white;
// 	height: 100px;
// 	width: 700px;
// }

// .card__description__body__button {
// 	margin-top: 10px;
// 	width: 50px;
// 	height: 30px;
// }
</style>
