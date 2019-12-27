<template>
	<BaseContainer>
		<div class="boards__favorited">
			<h3 class="boards__favorited__title">
				<i class="material-icons">
					star_border
				</i>
				Favorited Boards
			</h3>
			<div class="boards__favorited__cards">
				<Card v-for="board in boards" :key="board.id" :boardId="board.id">
					<div class="boards__favorited__cards__item__title">
						{{ board.title }}
					</div>
				</Card>

				<div
					class="boards__favorited__cards__add"
					@click="showCreateModal = true"
				>
					Create new board
				</div>

				<Modal v-if="showCreateModal" @close="showCreateModal = false">
					<h2 slot="header">Create new board</h2>
					<Post slot="body" />
				</Modal>
			</div>
		</div>
		<div class="boards__personal">
			<h3 class="boards__personal__title">
				<i class="material-icons">
					person
				</i>
				Personal Boards
			</h3>
		</div>
	</BaseContainer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			showCreateModal: false,
		};
	},
	components: {
		Card: () => import('@/components/board/Card.vue'),
		Post: () => import('@/components/board/Post.vue'),
	},
	created() {
		this.$store.dispatch('FETCH_BOARDS');
	},
	computed: {
		...mapGetters(['boards']),
	},
};
</script>

<style lang="scss" scoped>
.boards {
	width: 80%;
	height: 80%;
	margin: 3rem 20rem auto;
}

.boards__favorited__title {
	font-size: 1.6rem;
	font-weight: bold;
	margin-bottom: 10px;
}

.boards__favorited__cards {
	display: flex;
	flex-wrap: wrap;
}

.boards__favorited__cards__item {
	background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjesyYHll5qRS8pG5RgeqCKefljavp0lu5VkAMSEsHfd-gzHfcNg&s');
	background-position: center;
	border-radius: 3px;
	width: 190px;
	height: 95px;
	margin: 4.5px 9px;
	position: relative;
}

.boards__favorited__cards__item:hover {
	cursor: pointer;
}

.boards__favorited__cards__item__title {
	position: absolute;
	color: white;
	font-size: 1.6rem;
	font-weight: bold;
	margin: 10px 0 0 5px;
}

.boards__favorited__cards__add {
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	background-color: #f0f2f5;
	width: 190px;
	height: 95px;
	margin: 4.5px 9px;
	font-size: 1.6rem;
}

.boards__favorited__cards__add:hover {
	cursor: pointer;
	background-color: #e6e8eb;
}

.boards__personal {
	margin-top: 20px;
}
</style>
