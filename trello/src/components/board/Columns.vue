<template>
	<div>
		<draggable
			:list="lists"
			class="list"
			ghost-class="ghost"
			group="list"
			@change="moveList"
		>
			<div class="list__item" v-for="list in lists" :key="list.list_id">
				<div class="list__item__title">
					<h3>{{ list.title }}</h3>
				</div>

				<!-- <BaseTitleInput
						:title="list.title"
						:newTitle.sync="newTitle"
						:type="'update'"
						@action="updateListTitle(list.list_id)"
					>
						<button slot="button" @click="deleteList(list.list_id)">
							Delete
						</button>
					</BaseTitleInput> -->
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
		</draggable>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	data() {
		return {
			showListCreateInput: false,
			isDragging: false,
			delayedDragging: false,
			newTitle: '',
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
	watch: {
		isDragging(newValue) {
			if (newValue) {
				this.delayedDragging = true;
				return;
			}
			this.$nextTick(() => {
				this.delayedDragging = false;
			});
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
		moveList: function(evt) {
			console.log(evt);
			if (evt.moved) this.$store.dispatch('MOVE_LIST', evt.moved);
		},
	},
};
</script>

<style lang="scss" scoped>
.list {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;

	&__item {
		flex: 0 0 auto;
		margin: 0.3rem;
		background-color: #ebecf0;
		border-radius: 2px;
	}
}
// ::-webkit-scrollbar-track {
// 	background-color: #5680ff79;
// }
</style>
