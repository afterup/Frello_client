<template>
	<BackDrop @close="$emit('close')">
		<div class="sidebar">
			<div class="sidebar__header">
				<div v-if="content === 'Menu'" class="hidden"></div>
				<i
					v-else
					@click="content = 'Menu'"
					class="material-icons sidebar__header__back"
					>keyboard_arrow_left</i
				>
				<div class="sidebar__header__text">{{ content }}</div>
				<i @click="$emit('close')" class="material-icons sidebar__header__close"
					>close</i
				>
			</div>
			<hr />
			<ul v-if="content === 'Menu'">
				<li @click="handleContent('About This Board')">
					<i class="material-icons">developer_board</i>About This Board
				</li>
				<li @click="handleContent('Change Background')">
					<i class="material-icons">brush</i>Change Background
				</li>
				<li @click="handleDeleteModal">
					<i class="material-icons">delete_sweep</i>Delete Board
				</li>
			</ul>
			<div v-else-if="content === 'About This Board'">
				<AboutBoard :board="board" />
			</div>
			<div v-else-if="content === 'Change Background'">
				<BackgroundColor />
			</div>
		</div>
		<Modal v-if="deleteModal" :close="false" @close="handleDeleteModal">
			<DeleteBoard
				:title="board.title"
				@click="deleteBoard"
				@close="handleDeleteModal"
			/>
		</Modal>
	</BackDrop>
</template>

<script>
export default {
	name: 'board-sidebar',
	data() {
		return {
			deleteModal: false,
			content: 'Menu',
		};
	},
	components: {
		Modal: () => import('@/components/modal/Modal'),
		BackDrop: () => import('@/components/ui/BackDrop'),
		AboutBoard: () => import('@/components/sidebar/AboutBoard'),
		DeleteBoard: () => import('@/components/sidebar/DeleteBoard'),
		BackgroundColor: () => import('@/components/sidebar/BackgroundColor'),
	},
	props: {
		currentUser: {
			type: Object,
			required: false,
		},
		board: {
			type: Object,
			required: true,
		},
	},
	methods: {
		handleContent(type) {
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
	},
};
</script>

<style lang="scss" scoped>
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
		font-weight: bold;

		&__text {
			font-size: 1.5rem;
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
}
</style>
