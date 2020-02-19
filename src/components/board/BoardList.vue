<template>
	<div @drop.stop @dragenter.stop @dragover.stop>
		<AppDrop @drop="moveCardOrList">
			<AppDrag
				class="list__item"
				:transferData="{
					type: 'list',
					fromListIndex: listIndex,
				}"
			>
				<div class="list__item__header">
					<ToggleTextarea
						v-model="list.title"
						:isTitle="true"
						:resize="true"
						:maxlength="500"
						@enter="updateList(list.list_id, list.title)"
					>
						<h3>{{ list.title }}</h3>
					</ToggleTextarea>

					<Dropdown>
						<i slot="button" class="material-icons">more_horiz</i>
						<div slot="name">Action</div>
						<li @click="deleteList(list.list_id)">Delete This List</li>
					</Dropdown>
				</div>
				<ul class="list__item__body">
					<li v-for="(card, $cardIndex) of list.Cards" :key="card.card_id">
						<ListCard
							:card="card"
							:cardIndex="$cardIndex"
							:list="list"
							:listIndex="listIndex"
						/>
					</li>
				</ul>
				<div
					class="list__item__footer"
					@drop.stop
					@dragenter.stop
					@dragover.stop
				>
					<ToggleTextarea
						v-model="cardTitle"
						:placeholder="{
							focus: 'Enter a title for this card...',
							blur: '➕ Add another card',
						}"
						@enter="createCard(list.list_id)"
					>
						<i slot="badge" class="material-icons">add</i>
						Add another card
					</ToggleTextarea>
					<!-- <div v-if="submitButton" class="textarea-field__textarea__button">
			<BaseBtn class="submit" @click="clickAddButton">Add</BaseBtn>
			<BaseBtn class="close" @click="handleTextareaToggle">Close</BaseBtn>
		</div> -->
				</div>
			</AppDrag>
		</AppDrop>
	</div>
</template>

<script>
import movingMixin from '@/mixins/movingMixin';

export default {
	name: 'board-list',
	data() {
		return {
			cardTitle: '',
			showHeaderDropdown: false,
		};
	},
	mixins: [movingMixin],
	components: {
		ListCard: () => import('@/components/board/ListCard.vue'),
		AppDrop: () => import('@/components/drag/AppDrop'),
		AppDrag: () => import('@/components/drag/AppDrag'),
		Dropdown: () => import('@/components/ui/Dropdown'),
	},
	methods: {
		updateList(id, title) {
			this.$store.dispatch('UPDATE_LIST', {
				list_id: id,
				title: title,
			});
		},
		deleteList(id) {
			this.$store.dispatch('DELETE_LIST', id).then(() => {});
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
		onDragOver(e) {
			if (this.list.Cards === []) {
				console.log(e);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.list-wrap {
	display: flex;
	flex-wrap: nowrap;
	margin: 0 2rem;
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
		width: 26rem;
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
			min-height: 1rem;
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

		&__footer {
			margin-top: 0.5rem;
		}
	}

	.delete-icon {
		font-size: 1.5rem;
	}
}
</style>
