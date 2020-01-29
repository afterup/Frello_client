<template>
	<div class="list-wrap">
		<draggable
			:list="lists"
			class="list"
			ghost-class="ghost"
			group="list"
			@change="moveList"
		>
			<div v-for="list in lists" :key="list.list_id">
				<div class="list__item">
					<div class="list__item__header">
						<BaseInput
							:type="'text'"
							v-model="list.title"
							:toggle="true"
							@enter="updateList(list.list_id, list.title)"
						></BaseInput>
						<BaseBtn slot="button" @click="deleteList(list.list_id)">
							<i class="material-icons delete-icon">delete</i>
						</BaseBtn>
					</div>
					<div class="list__item__body">
						<TaskList :list="list" />
					</div>
					<div class="list__item__footer">
						<BaseInput
							:create="true"
							:placeholder="'Add another card'"
							v-model="cardTitle"
							:type="'text'"
							@enter="createCard(list.list_id)"
						/>
					</div>
				</div>
			</div>
		</draggable>
		<div class="list__add">
			<BaseInput
				class="add-list__input"
				:create="true"
				:placeholder="'Add another list'"
				v-model="listTitle"
				:type="'text'"
				@enter="createList"
			/>
		</div>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	data() {
		return {
			cardTitle: '',
			listTitle: '',
		};
	},
	components: {
		TaskList: () => import('@/components/board/TaskList.vue'),
		draggable,
	},
	props: {
		lists: {
			type: Array,
			required: true,
		},
	},
	methods: {
		createList() {
			this.$store
				.dispatch('PUBLISH_LIST', {
					board_id: this.$route.params.id,
					title: this.listTitle,
				})
				.then(() => {
					this.handleListCreateInput();
					this.listTitle = '';
				});
		},
		updateList(id, title) {
			this.$store
				.dispatch('UPDATE_LIST', {
					list_id: id,
					title: title,
				})
				.then(() => {
					// this.newTitle = '';
				});
		},
		deleteList(id) {
			this.$store.dispatch('DELETE_LIST', id).then(() => {});
		},
		moveList: function(evt) {
			console.log(evt);
			if (evt.moved) this.$store.dispatch('MOVE_LIST', evt.moved);
		},
		createCard(listId) {
			this.$store
				.dispatch('PUBLISH_CARD', {
					list_id: listId,
					title: this.cardTitle,
				})
				.then(() => {
					this.cardTitle = '';
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.list-wrap {
	display: flex;
	flex-wrap: nowrap;
}

.list {
	display: flex;

	> * {
		flex: 0 0 auto;
	}

	&::after {
		content: '';
		flex: 0 0 auto;
	}

	&__item {
		display: flex;
		flex-direction: column;
		width: 25rem;
		max-height: 80vh;
		margin: 0.3rem;
		padding: 0.6rem;

		background-color: #ebecf0;
		border-radius: 2.5px;

		&:hover {
			cursor: pointer;
		}

		&__header {
			display: flex;
			justify-content: space-between;
			padding: 1rem;
			background-color: #ebecf0;
		}

		&__body {
			overflow-y: scroll;
			max-height: 70vh;

			&::-webkit-scrollbar {
				width: 6px;
				height: 10px;
			}
			&::-webkit-scrollbar-track {
				border-radius: 10px;
				background-color: rgb(231, 231, 231);
			}

			&::-webkit-scrollbar-thumb {
				border-radius: 9px;
				background-color: rgb(201, 201, 201);
			}
		}
	}

	.delete-icon {
		font-size: 1.5rem;
	}
}

.add-list__input {
	width: 24rem;
	background-color: #ebecf05b;
	border-radius: 2px;
}
</style>
