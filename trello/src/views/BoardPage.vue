<template>
	<div class="container">
		<BoardMeta :board="board" :currentUser="currentUser" />
		<Columns :lists="board.Lists" />
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
		...mapGetters(['board', 'currentUser']),
	},
	methods: {},
};
</script>

<style lang="scss" scoped>
.container {
	max-width: 120rem;
	margin: 0 6rem auto;
	background-color: #ffffff;

	min-height: 50rem;
}

.card {
	width: 760px;
	height: 600px;
	background-color: #ebecf0;
	border-radius: 2px;
}

.card__header {
	display: flex;
}

.card__header__title {
	font-size: 1.8rem;
	font-weight: bold;
}

.card__header__title__description {
	color: gray;
	font-size: 1.3rem;
}

.card__description {
	display: flex;
	flex-direction: row;
	margin-top: 20px;
}

.card__description__body {
	display: flex;
	flex-direction: column;
	font-size: 1.8rem;
	font-weight: bold;
}

.card__description__body__input {
	border: none;
	border-radius: 2px;
	background-color: white;
	height: 100px;
	width: 700px;
}

.card__description__body__button {
	margin-top: 10px;
	width: 50px;
	height: 30px;
}
</style>
