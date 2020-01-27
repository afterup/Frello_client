<template>
	<div class="board">
		<input type="text" v-if="showBoardTitleInput" v-model="title" @keyup.enter="updateBoardTitle" />
		<div class="board__title" v-else @click="handleBoardTitleInput">
			{{ board.title }}
		</div>
		<div class="board__favorite" @click="toggleFavorite">
			<i class="material-icons">
				star
			</i>
		</div>
		<div class="board__delete" @click="handleDeleteModal">
			<i class="material-icons">
				delete
			</i>
		</div>
		<Modal v-if="deleteModal" @close="handleDeleteModal">
			<div>
				<h3>알림</h3>
				<div>
					<div>정말로 삭제하시겠습니까?</div>
					<button @click="deleteBoard">확인</button>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
export default {
	props: {
		board: {
			type: Object,
			required: true,
		},
		currentUser: {
			type: Object,
			required: false,
		},
	},
	data() {
		return {
			showBoardTitleInput: false,
			deleteModal: false,
			title: this.board.title,
		};
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
		toggleFavorite() {
			let favorite = this.board.favorite;
			this.$store
				.dispatch('PUBLISH_FAVORITE_BOARD', {
					id: this.$route.params.id,
					favorite: !favorite,
				})
				.then(() => {});
		},
		handleDeleteModal() {
			this.deleteModal = !this.deleteModal;
		},
		deleteBoard() {
			this.$store.dispatch('DELETE_BOARD', this.$route.params.id).then(() => {
				this.$router.push({
					name: 'boards',
					params: { username: this.currentUser.username },
				});
			});
		},
		handleBoardTitleInput() {
			this.showBoardTitleInput = !this.showBoardTitleInput;
		},
		updateBoardTitle() {
			this.$store
				.dispatch('UPDATE_BOARD', {
					board_id: this.$route.params.id,
					title: this.title,
				})
				.then(() => {
					this.handleBoardTitleInput();
					this.listTitle = '';
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.board {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 10px;
	height: 50px;

	&__title {
		font-size: 1.7rem;
		font-weight: bold;
		margin-right: 10px;
	}

	&__favorite {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 25px;
		border: none;
		background-color: rgba(187, 187, 187, 0.74);
		border-radius: 2px;

		&:hover {
			cursor: pointer;
			background-color: rgba(167, 167, 167, 0.74);
		}

		i {
			font-size: 15px;
		}
	}

	&__delete {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 25px;
		border: none;
		margin-left: 3px;
		background-color: rgba(187, 187, 187, 0.74);
		border-radius: 2px;

		&:hover {
			cursor: pointer;
			background-color: rgba(167, 167, 167, 0.74);
		}

		i {
			font-size: 15px;
		}
	}
}
</style>
