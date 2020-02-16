<template>
	<div class="list-wrap" @drop.stop @dragenter.stop @dragover.stop>
		<AppDrop @drop="moveCardOrList">
			<AppDrag
				class="list"
				:transferData="{
					type: 'list',
					fromListIndex: listIndex,
				}"
			>
				<div class="list__header">
					<ToggleInput
						v-model="list.title"
						class="list__header__title"
						:type="'text'"
						@enter="updateList(list.list_id, list.title)"
					>
					</ToggleInput>
					<BaseBtn
						class="list__header__delete"
						:icon="true"
						@click="deleteList(list.list_id)"
					>
						<i slot="badge" class="material-icons">delete</i>
					</BaseBtn>
				</div>
				<ul class="list__body">
					<li v-for="(card, $cardIndex) of list.Cards" :key="card.card_id">
						<ListCard
							:card="card"
							:cardIndex="$cardIndex"
							:list="list"
							:listIndex="listIndex"
						/>
					</li>
				</ul>
				<div class="list__footer" @drop.stop @dragenter.stop @dragover.stop>
					<ToggleInput
						v-model="cardTitle"
						class="list__footer__input"
						:placeholder="'Enter a title for this card...'"
						:type="'textarea'"
						@click="createCard(list.list_id)"
						@enter="createCard(list.list_id)"
					>
						<i slot="badge" class="material-icons">add</i>
						Add another card
					</ToggleInput>
				</div>
			</AppDrag>
		</AppDrop>
	</div>
</template>

<script>
import movingMixin from '@/mixins/movingMixin';

export default {
	data() {
		return {
			cardTitle: '',
		};
	},
	mixins: [movingMixin],
	components: {
		ListCard: () => import('@/components/board/ListCard.vue'),
		AppDrop: () => import('@/components/drag/AppDrop'),
		AppDrag: () => import('@/components/drag/AppDrag'),
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
.list {
	display: flex;
	flex-direction: column;
	width: 27rem;
	max-height: 80vh;
	margin: 0.3rem;

	padding: 0.3rem;
	border-radius: 2.5px;

	background-color: #ebecf0;

	&:hover {
		cursor: pointer;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		margin: 0.5rem;
		padding: 1rem;
		background-color: #ebecf0;

		&__title {
			font-size: 2.5rem;
		}

		&__delete {
			background-color: $color-grey-dark-3;

			i {
				font-size: 1.7rem;
			}
		}
	}

	&__body {
		min-height: 1rem;
		max-height: 70vh;
		margin-left: 12px;
		overflow-y: scroll;

		li {
			display: inline-block;
			width: 24rem;
		}

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
		margin-left: 12px;

		&__input {
			font-size: 1.3rem;
			color: $color-grey-dark-2;
		}
	}
}
</style>
