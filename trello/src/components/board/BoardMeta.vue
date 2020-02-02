<template>
	<div class="metaWrap">
		<div class="meta">
			<BaseInput
				v-model="board.title"
				:type="'text'"
				:kind="'toggle'"
				@enter="updateBoardTitle"
			>
				{{ board.title }}
			</BaseInput>
			<BaseBtn class="meta__favorite" @click="toggleFavorite">
				<i class="material-icons" :class="board.favorite ? 'yellow' : ''"
					>star</i
				>
			</BaseBtn>
		</div>
		<BaseBtn class="sidebar__button" @click="toggleSidebar">
			Show Menu
		</BaseBtn>
		<Sidebar
			v-if="isSidebarOpen"
			:currentUser="currentUser"
			:board="board"
			@close="toggleSidebar"
		/>
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
			isSidebarOpen: false,
			showBoardTitleInput: false,
			title: this.board.title,
		};
	},
	components: {
		Sidebar: () => import('@/components/board/sidebar/BoardSidebar'),
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
		toggleSidebar() {
			this.isSidebarOpen = !this.isSidebarOpen;
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

.yellow {
	color: rgb(255, 217, 0);
}
</style>
