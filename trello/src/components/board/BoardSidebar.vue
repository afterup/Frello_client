<template>
	<div class="sidebarWrap">
		<BaseBtn class="sidebar__button" @click="toggleSidebar">
			<div slot="badge">
				<i class="material-icons">delete</i>
			</div>
			<div class="sidebar__text">
				Show Menu
			</div>
		</BaseBtn>
		<div v-if="isSidebarOpen">
			<div class="sidebar">
				<div class="sidebar__header">
					<i
						v-if="content !== 'Menu'"
						@click="content = 'Menu'"
						class="material-icons sidebar__header__back"
						>keyboard_arrow_left</i
					>
					<div v-else class="hidden"></div>
					<div class="sidebar__header__text">{{ content }}</div>
					<i
						@click="toggleSidebar"
						class="material-icons sidebar__header__close"
						>close</i
					>
				</div>
				<hr />
				<ul v-if="content === 'Menu'">
					<li @click="handleList('About This Board')">
						<i class="material-icons">developer_board</i>About This Board
					</li>
					<li @click="handleList('Change Background')">
						<i class="material-icons">brush</i>Change Background
					</li>
					<li @click="handleDeleteModal">
						<i class="material-icons">delete_sweep</i>Delete Board
					</li>
				</ul>
				<div v-else-if="content === 'About This Board'">
					About This Board
				</div>
				<div v-else-if="content === 'Change Background'">
					<div class="colors">
						<div
							class="colors__item"
							:class="color"
							v-for="(color, i) in colors"
							:key="i"
							@click="chooseBackground(color)"
						></div>
					</div>
				</div>
			</div>
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
	data() {
		return {
			isSidebarOpen: false,
			deleteModal: false,
			content: 'Menu',
			colors: ['blue', 'red', 'orange', 'yellow', 'green', 'purple'],
		};
	},
	props: {
		currentUser: {
			type: Object,
			required: false,
		},
	},
	methods: {
		toggleSidebar() {
			this.isSidebarOpen = !this.isSidebarOpen;
		},
		handleList(type) {
			if (type === 'About This Board') {
				this.content = 'About This Board';
			} else if (type === 'Change Background') {
				this.content = 'Change Background';
			}
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
		chooseBackground(color) {
			this.$store.dispatch('UPDATE_BOARD', {
				board_id: this.$route.params.id,
				background: color,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
@import '@/lib/styles/_boardPalette';

.sidebar {
	position: absolute;
	top: $header-height;
	right: 0;
	background-color: #f4f5f7;
	width: 25rem;
	height: calc(100vh - #{$header-height} - 2rem);

	&__header {
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		font-size: 1.5rem;
		font-weight: bold;

		&__text {
		}

		&__close {
			&:hover {
				cursor: pointer;
			}
		}

		&__back {
			&:hover {
				cursor: pointer;
			}
		}
	}

	.hidden {
		width: 2.365rem;
	}

	hr {
		border: 0.5px solid rgb(187, 187, 187);
	}

	ul {
		list-style: none;

		li {
			display: flex;
			align-items: center;
			padding: 1.3rem;
			font-size: 1.2rem;

			&:hover {
				background-color: rgb(231, 231, 231);
				cursor: pointer;
			}

			i {
				margin-right: 0.8rem;
			}
		}
	}

	.colors {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		padding: 1rem;

		&__item {
			width: 75px;
			height: 75px;
			margin-right: 5px;
			margin-bottom: 1rem;
			border-radius: 3px;

			&:hover {
				cursor: pointer;
			}
		}
	}
}
</style>
