<template>
	<div class="board-meta">
		<div class="board-meta__left">
			<ToggleText
				class="board-meta__left__title"
				v-model="board.title"
				:maxlength="30"
				@enter="updateBoardTitle"
			/>
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
			<BaseBtn
				class="sidebar__button"
				:class="{ button_active: isSidebarOpen }"
				@click="toggleSidebar"
			>
				Show Menu
			</BaseBtn>
			<div class="sidebar">
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
import { UPDATE_BOARD, PUBLISH_FAVORITE_BOARD } from '@/store/actions.type';

export default {
	name: 'board-meta',
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
		};
	},
	components: {
		BoardSidebar: () => import('@/components/sidebar/BoardSidebar'),
	},
	methods: {
		toggleFavorite() {
			let favorite = this.board.favorite;
			this.$store
				.dispatch(PUBLISH_FAVORITE_BOARD, {
					id: this.$route.params.id,
					favorite: !favorite,
				})
				.then(() => {});
		},
		toggleSidebar() {
			this.isSidebarOpen = !this.isSidebarOpen;
		},
		updateBoardTitle() {
			this.$store.dispatch(UPDATE_BOARD, {
				board_id: this.$route.params.id,
				title: this.board.title,
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
}

.slide-enter-active {
	transition: all 0.3s ease;
	transform: translateX(0px);
}
.slide-leave-active {
	transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
	transform: translateX(100%);
}
</style>
