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
				<BaseInput
					:type="'text'"
					v-model="list.title"
					:toggle="true"
					@enter="updateList(list.list_id, list.title)"
				></BaseInput>

				<BaseBtn slot="button" @click="deleteList(list.list_id)">
					<i class="material-icons delete-icon">delete</i>
				</BaseBtn>
				<draggable
					:list="list.Cards"
					class="card"
					ghost-class="ghost"
					group="card"
					:move="moveCard"
					@end="endCard"
				>
					<div v-for="card in list.Cards" :key="card.card_id">
						<Task :card="card" />
					</div>
				</draggable>
				<BaseInput
					:create="true"
					:placeholder="'Add another card'"
					v-model="cardTitle"
					:type="'text'"
					@enter="createCard(list.list_id)"
				/>
			</div>
		</draggable>
		<BaseInput
			class="add-list__input"
			:create="true"
			:placeholder="'Add another list'"
			v-model="listTitle"
			:type="'text'"
			@enter="createList"
		/>
	</div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
	data() {
		return {
			listTitle: '',
			cardTitle: '',
			moveEvent: {},
		};
	},
	components: {
		Task: () => import('@/components/board/Task.vue'),
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
		moveCard: function(evt) {
			console.log(evt);
			const { relatedContext, draggedContext } = evt;

			this.moveEvent = {
				relatedContext,
				newListId: relatedContext.element.list_id,
			};
		},
		endCard: function(evt) {
			console.log(this.moveEvent);
			this.$store.dispatch('MOVE_CARD', {
				evt: this.moveEvent,
			});
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

	.delete-icon {
		font-size: 1.5rem;
	}
}
// ::-webkit-scrollbar-track {
// 	background-color: #5680ff79;
// }
</style>
