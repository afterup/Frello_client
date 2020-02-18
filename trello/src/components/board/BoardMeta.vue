<template>
	<div class="board-meta">
		<div class="board-meta__left">
			<ToggleText
				class="board-meta__left__title"
				v-model="board.title"
				:maxlength="30"
				:resize="true"
				@enter="updateBoardTitle"
			>
				{{ board.title }}
			</ToggleText>
			<BaseBtn
				class="board-meta__left__favorite"
				:icon="true"
				@click="toggleFavorite"
			>
				<i
					class="material-icons"
					slot="badge"
					:class="board.favorite ? 'yellow' : ''"
					>star</i
				>
			</BaseBtn>
		</div>
		<div class="board-meta__right">
			<div class="sidebar">
				<BaseBtn
					class="sidebar__button"
					:class="{ button_active: isSidebarOpen }"
					@click="toggleSidebar"
				>
					Show Menu
				</BaseBtn>
				<transition name="slide">
					<BoardSidebar
						v-if="isSidebarOpen"
						:currentUser="currentUser"
						:board="board"
						@close="toggleSidebar"
					/>
				</transition>
			</div>
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
			isSidebarOpen: false,
			showBoardTitleInput: false,
			title: this.board.title,
		};
	},
	components: {
		BoardSidebar: () => import('@/components/sidebar/BoardSidebar'),
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
.board-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: $meta-height;

	&__left {
		display: flex;
		align-items: center;

		&__title {
			font-size: 2rem;
			color: white;
		}

		&__favorite {
			margin-left: 0.5rem;

			.material-icons {
				font-size: 1.75rem;
			}

			.yellow {
				color: rgb(255, 217, 0);
			}
		}
	}

	&__right {
		&__sidebar {
			.button_active {
				transform: translateX(-260%);
				transition: transform 0.3s ease;
			}

			.slide-enter-active,
			.slide-leave-active {
				transition: transform 0.3s ease;
			}

			.slide-enter,
			.slide-leave-to {
				transform: translateX(100%);
				transition: all 0.15s ease;
			}
		}
	}
}
</style>
