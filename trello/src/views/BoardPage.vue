<template>
	<div class="container">
		<div class="board">
			<!-- boards=> board로 변경-->
			<div class="board__title">
				Project Trello
			</div>
			<div class="board__favorite">
				<i class="material-icons">
					star
				</i>
			</div>
		</div>
		<div class="list-container">
			<div class="list">
				<div class="list__title">
					Test One
				</div>
				<div class="list__items">
					<div class="list__items__item">
						<div class="list__items__item__title">
							one
						</div>
					</div>
					<div class="list__items__item">
						<div class="list__items__item__title">
							one
						</div>
					</div>
					<div class="list__items__item">
						<div class="list__items__item__title">
							one
						</div>
					</div>

					<div class="list__items__add">
						<i class="material-icons">
							add
						</i>
						<div class="list__items__add__text">Add another card</div>
					</div>
				</div>
			</div>
			<div class="list-container">
				<div class="list">
					<div class="list__title">
						Test One
					</div>
					<div class="list__items">
						<div class="list__items__item">
							<div class="list__items__item__title">
								one
							</div>
						</div>
						<div class="list__items__item">
							<div class="list__items__item__title">
								one
							</div>
						</div>
						<div class="list__items__item">
							<div class="list__items__item__title">
								one
							</div>
						</div>

						<div class="list__items__add">
							<i class="material-icons">
								add
							</i>
							<div class="list__items__add__text">Add another card</div>
						</div>
					</div>
				</div>
				<input
					type="text"
					v-if="showListInput"
					v-model="listTitle"
					@keyup.enter="addList"
				/>
				<div class="add-list">
					<i class="material-icons">
						add
					</i>
					<div class="add-list__text" @click="showListInput = true">
						Add another list
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			showListInput: false,
			listTitle: null,
		};
	},
	created() {
		this.$store.dispatch('FETCH_BOARD', this.$route.params.id);
	},
	computed: {
		...mapGetters(['board']),
	},
	methods: {
		addList() {
			this.$store
				.dispatch('PUBLISH_LIST', {
					title: this.listTitle,
					board_id: this.$route.params.id,
					position: 1,
				})
				.then(() => {
					this.showListInput = false;
					// this.$store.dispatch('FETCH_BOARD', this.$route.params.id);
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	max-width: 120rem;
	margin: 0 6rem auto;
	background-color: #ffffff;

	min-height: 50rem;
}

.board {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;
	height: 50px;
}

.board__title {
	font-size: 1.7rem;
	font-weight: bold;
	margin-right: 10px;
}

.board__favorite {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 25px;
	height: 25px;
	border: none;
	background-color: rgba(187, 187, 187, 0.74);
	border-radius: 2px;
}

.board__favorite:hover {
	cursor: pointer;
	background-color: rgba(167, 167, 167, 0.74);
}

.board__favorite i {
	font-size: 15px;
}

.list-container {
	display: flex;
}

.list {
	display: flex;
	flex-direction: column;
	padding: 10px;
	margin-right: 10px;
	width: 275px;
	background-color: #ebecf0;
	border-radius: 2px;
}

.list__title {
	font-size: 1.4rem;
	font-weight: bold;
	margin-bottom: 10px;
}

.list__items__item {
	display: flex;
	align-items: center;
	background-color: white;
	width: 250px;
	height: 30px;
	margin-bottom: 8px;
	border-radius: 2px;
	box-shadow: 0px 1.3px rgb(182, 182, 182);
}

.list__items__item:hover {
	background-color: rgb(240, 240, 240);
	cursor: pointer;
}

.list__items__item__title {
	margin-left: 8px;
	font-size: 1.4rem;
}

.list__items__add {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 10px;
	width: 250px;
	height: 30px;
	border-radius: 3px;
}

.list__items__add:hover {
	background-color: rgb(218, 218, 218);
	cursor: pointer;
}

.list__items__add__text {
	color: gray;
	font-size: 1.3rem;
}

.list__items__add i {
	color: gray;
	font-size: 18px;
}

.add-list {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: rgba(187, 187, 187, 0.74);
	border-radius: 2px;
	width: 250px;
	height: 30px;
}

.add-list i {
	color: gray;
	font-size: 18px;
}

.add-list__text {
	color: gray;
	font-size: 1.3rem;
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
