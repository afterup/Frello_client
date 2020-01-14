<template>
	<div class="list-container">
		<div class="list" v-for="list in lists" :key="list.list_id">
			<BaseTitleInput
				:title="list.title"
				:newTitle.sync="newTitle"
				:type="'update'"
				@action="updateListTitle(list.list_id)"
			>
				<button slot="button" @click="deleteList(list.list_id)">Delete</button>
			</BaseTitleInput>
			<TaskList :cards="list.Cards" :listId="list.list_id" />
		</div>

		<input
			type="text"
			class="add-list__input"
			plceholder="Enter a title for this list..."
			v-model="listTitle"
			v-if="showListCreateInput"
			@keyup.enter="createList"
		/>
		<div class="add-list" @click="handleListCreateInput" v-else>
			<i class="material-icons">
				add
			</i>
			<div class="add-list__text">
				Add another list
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showListCreateInput: false,
			newTitle: '',
			listTitle: '',
		};
	},
	components: {
		TaskList: () => import('@/components/board/TaskList.vue'),
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
					position: 1,
				})
				.then(() => {
					this.handleListCreateInput();
					this.listTitle = '';
				});
		},
		handleListCreateInput() {
			this.showListCreateInput = !this.showListCreateInput;
		},
		updateListTitle(id) {
			this.$store
				.dispatch('UPDATE_LIST', {
					list_id: id,
					title: this.newTitle,
				})
				.then(() => {
					this.newTitle = '';
				});
		},
		deleteList(id) {
			this.$store.dispatch('DELETE_LIST', id).then(() => {});
		},
	},
};
</script>

<style lang="scss" scoped>
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
</style>
