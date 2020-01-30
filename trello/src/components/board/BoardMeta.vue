<template>
	<div class="metaWrap">
		<div class="meta">
			<BaseInput
				:type="'text'"
				v-model="board.title"
				:toggle="true"
				@enter="updateBoardTitle"
			>
				{{ board.title }}
			</BaseInput>
			<BaseBtn class="meta__favorite" @click="toggleFavorite">
				<i class="material-icons">star</i>
			</BaseBtn>
			<BaseBtn class="meta__delete" @click="handleDeleteModal">
				<i class="material-icons">delete</i>
			</BaseBtn>
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
		<div class="sidebar">
			<Sidebar />
		</div>
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
	components: {
		Sidebar: () => import('@/components/board/BoardSidebar'),
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
					title: this.board.title,
				})
				.then(() => {
					this.handleBoardTitleInput();
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.metaWrap {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: $meta-height;
}

.meta {
	display: flex;
	justify-content: flex-start;
	align-items: center;

	&__favorite {
		margin-left: 1rem;
		margin-right: 1rem;
	}
}

.material-icons {
	font-size: 1.7rem;
}
</style>
