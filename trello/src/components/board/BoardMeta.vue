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
		</div>
		<div class="sidebar">
			<Sidebar :currentUser="currentUser" />
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
